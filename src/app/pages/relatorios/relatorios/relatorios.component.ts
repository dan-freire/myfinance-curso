import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import currencyFormatter from 'currency-formatter';

import { Categoria } from '../../categorias/shared/categoria.model';
import { CategoriaService } from '../../categorias/shared/categoria.service';
import { Entrada } from '../../entradas/shared/entrada.model';
import { EntradaService } from '../../entradas/shared/entrada.service';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {

  receitaTotal: number = 0;
  despesaTotal: number = 0;
  saldo: number = 0;

  receitaDataChart: any;
  despesaDataChart: any;

  chartOption = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }

  categorias: Categoria[] = [];
  entradas: Entrada[] = [];

  @ViewChild('mes') mes : ElementRef = null;
  @ViewChild('ano') ano : ElementRef = null;

  constructor(private categoriaService: CategoriaService, private entradaService: EntradaService) { }

  ngOnInit() {
    
    this.categoriaService.getAll()
      .subscribe(categorias => this.categorias = categorias);
  }

  public gerarRelatorios() {

    const mes = this.mes.nativeElement.value;
    const ano = this.ano.nativeElement.value;

    if (!mes || !ano)
      alert('Precisa selcionar o mês e o ano para gerar os relatórios');
    else
      this.entradaService.getByMesAno(mes, ano)
        .subscribe(this.setValores.bind(this));
  }

  private setValores(entradas: Entrada[]) {

    this.entradas = entradas;
    this.calcularSaldo();
    this.setChartData();
  }

  private calcularSaldo() {

    let receitaTotal = 0;
    let despesaTotal = 0;

    this.entradas.forEach(entrada => {
      if (entrada.tipo == 'receita')
        receitaTotal += currencyFormatter.unformat(entrada.valor, { code: 'BRL' });
      else
        despesaTotal += currencyFormatter.unformat(entrada.valor, { code: 'BRL' });
    });

    this.receitaTotal = currencyFormatter.format(receitaTotal, { code: 'BRL' });
    this.despesaTotal = currencyFormatter.format(despesaTotal, { code: 'BRL' });
    this.saldo = currencyFormatter.format((receitaTotal - despesaTotal), { code: 'BRL' });
  }

  private setChartData() {

    this.receitaDataChart = this.getChartData('receita', 'Gráfido de Receitas', '#9CCC65');
    this.despesaDataChart = this.getChartData('despesa', 'Gráfido de Despesas', '#E03131');
  }

  private getChartData(tipoEntrada: string, titulo: string, color: string) {

    const chartData = [];

    this.categorias.forEach(categoria => {
      // Filtrando entradas por categorias e tipos
      const entradasFiltradas = this.entradas.filter(entrada => (entrada.categoriaId == categoria.id) && (entrada.tipo == tipoEntrada))

      // Somar entradas
      if (entradasFiltradas.length) {
        const totalReceitas = entradasFiltradas.reduce((total, entrada) => total += currencyFormatter.unformat(entrada.valor, { code: 'BRL' }), 0);
      
        chartData.push({
          categoriaNome: categoria.nome,
          totalSoma: totalReceitas
        });
      }
    });

    return {
      labels: chartData.map(item => item.categoriaNome),
      datasets: [
        {
          label: titulo,
          backgroundColor: color,
          data: chartData.map(item => item.totalSoma)
        }
      ]
    }
  }
}
