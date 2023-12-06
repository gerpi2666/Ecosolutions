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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit {
  grafic: any;
  materiales: any;
  ctx: any;
  @ViewChild('graficoCanvas1') graficoCanvas1!: { nativeElement: any };
  //Elemento html del Canvas del gráfico 2
  CenterName: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  currentUser: any;
  Report: any;
  labels: any[] = [];
  color: any[] = [];
  datag: any[] = [];
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
    this.listarMaterial();
    this.chargeReporAndCenter();
   
  }

  ngAfterViewInit(): void {

    if (this.graficoCanvas1) {
      const ctx = this.graficoCanvas1.nativeElement.getContext('2d');
      if (ctx) {
        this.RenderChart(ctx);
      }
    }
  }

  listarMaterial() {
    this.gService
      .list('material/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.materiales = response.Data;
        console.log('DATOS MATERIAL', this.materiales);
      });
  }

  chargeReporAndCenter() {
    this.gService
      .get('orden/report', this.currentUser.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.Report = data.Data;
        this.CenterName = data.Data.Center.Name;
        let list = [];
        this.Report.Materials.forEach((element) => {
          list.push({
            id: element.MaterialId,
            Count: element._count._all,
          });
        });
        console.log('LIST', list);
        let list2 = [];
        list.forEach((item) => {
          const material = this.materiales.find((mat) => mat.Id === item.id);
          if (material) {
            list2.push({
              Name: material.Name,
              Count: item.Count,
              Color: material.Color,
            });
          }
        });
        list2.forEach((element) => {
          this.labels.push(element.Name);
          this.datag.push(element.Count);

          this.color.push(element.Color);
        });
        console.log('LIST2', list2);
      });
  }

  RenderChart(ctx: CanvasRenderingContext2D): void {
    // Datos del gráfico
    

    new Chart(ctx, {
      type: 'bar', // Tipo de gráfico
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Ordenes por material',
          data: this.datag,
          backgroundColor: this.color,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }




}
