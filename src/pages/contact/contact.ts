import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

import { Http } from '@angular/http';

import 'rxjs/add/operator/map';



@Component({
	selector: 'page-contact',
	templateUrl: 'contact.html'
})

export class ContactPage {

	dados: any = [];
	dadosRodada : any = [];
	bloqueado: boolean = true;
	rodada: number = 1;

	constructor(public navCtrl: NavController, public http: Http, private alertCtrl: AlertController) {
	}

	ngOnInit(): void {
		this.dados.partidas = [];
		this.rodada = 1;
		let that = this;
		this.http.get('https://api.cartolafc.globo.com/mercado/status').map(res => res.json()).subscribe(data => {
			this.carregarRodadas();
			this.carregarJogosRodada(data.rodada_atual);
		}, function(error){
			that.alerta('Não foram encontrados dados!');
		});

	}

	alerta(mensagem) {
		let alert = this.alertCtrl.create({
			title: 'Alerta',
			subTitle: mensagem,
			buttons: ['OK']
		});
		alert.present();
	}

	carregarJogosRodada (rodada){
		console.log(rodada);
		this.rodada = rodada;
		this.dados = {};
		let that = this;
		this.http.get('https://api.cartolafc.globo.com/partidas/'+rodada).map(res => res.json()).subscribe(data => {
			this.dados = data;
		}, function(error){
			that.alerta('Não foram encontrados dados para rodada selecionada!');
		});
	}

	carregarRodadas (){
		let that = this;
		this.http.get('https://api.cartolafc.globo.com/rodadas').map(res => res.json()).subscribe(data => {
			this.dadosRodada = data;
		}, function(error){
			that.alerta('Não foram encontrados dados!');
		});
	}



	//https://api.cartolafc.globo.com/partidas/1
	//https://api.cartolafc.globo.com/mercado/status

}
