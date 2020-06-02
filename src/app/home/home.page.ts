import { Component,ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ILocal } from '../interface/ILocal';

declare var google : any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

map: any;
posicaoAtual: any;

public listaLocais : ILocal[] =[
 {
    lat:-22.497872,
    lng:-48.550195,
    titulo:'Ponto1'
  },
  {
    lat:-22.495998,
    lng:-48.550612,
    titulo:'Ponto2'

  },
];

@ViewChild('map', {read: ElementRef, static:false}) mapRef: ElementRef;

  constructor(private geolocation: Geolocation) {}

  public async ShowMap(){
    //const location = new google.maps.LatLng(-22.495055, -48.557157);posição fixa
    await this.buscaPosicao()
    const options = {
    center: this.posicaoAtual,
    zoom : 15,
    disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options)

    const marcador = new google.maps.Marker({
      position: this.posicaoAtual,
      map: this.map,
      title:"minha localização",
      icon:'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
      animation: google.maps.Animation.BOUNCE
    });

    const marcador1 = new google.maps.Marker({
      position:new google.maps.LatLng(-22.495055, -48.557157),
      map: this.map,
      title:"minha localização",
      icon:'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
      animation: google.maps.Animation.BOUNCE
    });
    const marcador2 = new google.maps.Marker({
      position:new google.maps.LatLng(-22.497762, -48.557204),
      map: this.map,
      title:"minha localização",
      icon:'https://maps.google.com/mapfiles/ms/icons/orange-dot.png',
      animation: google.maps.Animation.BOUNCE
    });

    const marcador3 = new google.maps.Marker({
      position:new google.maps.LatLng(-22.491949, -48.550432),
      map: this.map,
      title:"minha localização",
      icon:'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      animation: google.maps.Animation.BOUNCE
    });
    const marcador4 = new google.maps.Marker({
      position:new google.maps.LatLng(-22.498916, -48.550002),
      map: this.map,
      title:"minha localização",
      icon:'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      animation: google.maps.Animation.BOUNCE
    });

  
    
    for(let local of this.listaLocais)
    this.adicionarMarcador(local);
    
  }
   
  ionViewDidEnter(){
    this.ShowMap();
  }

  private adicionarMarcador(Local: ILocal){
    const{lat , lng ,titulo} = Local;

    const marcador = new google.maps.Marker({
    position:{ lat, lng },
    map: this.map,
    title: titulo,
    });
  }

  public async buscaPosicao(){
    await this.geolocation.getCurrentPosition().then((posicaoGPS) => {
      this.posicaoAtual = {
       lat:posicaoGPS.coords.latitude,
       lng:posicaoGPS.coords.longitude
      }
    
    }).catch((error) => {
       console.log('Error getting location', error);
    }); 
  }

}
