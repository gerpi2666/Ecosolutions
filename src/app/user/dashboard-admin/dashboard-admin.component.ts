import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../share/authentication.service';
import Chart from 'chart.js/auto';

enum TypeGraph {
  BAR = 'bar',
  BUBBLE = 'bubble',
  DOUGHNUT = 'doughnut',
  PIE = 'pie',
  LINE = 'line',
  POLARAREA = 'polarArea',
  RADAR = 'radar',
  SCATTER = 'scatter',
}
@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
})
export class DashboardAdminComponent {
  grafic: any;
  centers: any;
  ctx: any;
  @ViewChild('graficoCanvas1') graficoCanvas1!: { nativeElement: any };
  @ViewChild('graficoCanvas2') graficoCanvas2!: { nativeElement: any };

  //Elemento html del Canvas del gráfico 2
  CenterName: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  currentUser: any;
  Report: any;
  labels: any[] = [];
  color: any[] = [];
  datag: any[] = [];
  labels2: any[] = [];
  color2: any[] = [];
  datag2: any[] = [];
  constructor(
    private gService: GenericService,

    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {}
  ngOnInit(): void {
    this.authService.decodeToken.subscribe(
      (user: any) => (this.currentUser = user)
    );

    console.log('DATA USER ', this.currentUser);
    this.getCenters();
    this.getReport();
   
  }

  ngAfterViewInit(): void {
    if (this.graficoCanvas1) {
      const ctx = this.graficoCanvas1.nativeElement.getContext('2d');
      if (ctx) {
        this.RenderChart(ctx);
      }
    }
    if (this.graficoCanvas2) {
      const ctx = this.graficoCanvas2.nativeElement.getContext('2d');
      if (ctx) {
        this.RenderChart2(ctx);
      }
    }
  }

  getCenters() {
    this.gService
      .list('center/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.centers = response.Data;
        console.log('DATOS centtos', this.centers);
      });
  }

  generateRandomColor(): string {
    // Generar valores aleatorios para los componentes RGB
    const r = Math.floor(Math.random() * 256); // Componente Rojo
    const g = Math.floor(Math.random() * 256); // Componente Verde
    const b = Math.floor(Math.random() * 256); // Componente Azul

    // Convertir los componentes RGB a formato hexadecimal
    const color = `#${r.toString(16).padStart(2, '0')}${g
      .toString(16)
      .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

    return color;
  }

  getReport() {
    this.gService
      .list('orden/reportAdmin')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.Report = data.Data;
        console.log('REPORT', this.Report);
        let list = [];

        this.Report.CoinsGlobalYear.forEach((element) => {
          list.push({
            id: element.IdCenter,
            Count: element._sum.Total,
          });
        });

        console.log('LIST', list);

        let list2 = [];
        list.forEach((item) => {
          const material = this.centers.find((mat) => mat.Id === item.id);
          if (material) {
            list2.push({
              Name: material.Name,
              Count: item.Count,
              Color: this.generateRandomColor(),
            });
          }
        });
        list2.forEach((element) => {
          this.labels.push(element.Name);
          this.datag.push(element.Count);

          this.color.push(element.Color);
        });
        console.log('LIST2', list2);
        this.getdataGrafic2()
      });
  }

  getdataGrafic2() {
    let list = [];
        this.Report.CoinsGlobalMonth.forEach((element) => {
      list.push({
        id: element.IdCenter,
        Count: element._sum.Total,
      });
    });
    let list2 = [];
    list.forEach((item) => {
      const material = this.centers.find((mat) => mat.Id === item.id);
      if (material) {
        list2.push({
          Name: material.Name,
          Count: item.Count,
          Color: this.generateRandomColor(),
        });
      }
    });
    console.log('DATA GRAFIC 2', list2)
    list2.forEach((element) => {
      this.labels2.push(element.Name);
      this.datag2.push(element.Count);

      this.color2.push(element.Color);
    });
  }

  RenderChart(ctx: CanvasRenderingContext2D): void {
    console.log('entrando rnde 1')
    // Datos del gráfico
    console.log('Rendse 1 ', this.datag2)

    new Chart(ctx, {
      type: 'bar', // Tipo de gráfico
      data: {
        labels: this.labels2,
        datasets: [
          {
            label: 'Ordenes por material',
            data: this.datag2,
            backgroundColor: this.color2,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  RenderChart2(ctx: CanvasRenderingContext2D): void {
    // Datos del gráfico
    console.log('Rendse 2 ', this.datag)
    new Chart(ctx, {
      type: 'bar', // Tipo de gráfico
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Ordenes por material',
            data: this.datag,
            backgroundColor: this.color,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
