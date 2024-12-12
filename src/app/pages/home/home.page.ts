import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { GeolocationService } from 'src/app/services/geolocation.service';
import * as L from 'leaflet'; // Importamos Leaflet
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { IonRouterLink } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, // Permite usar directivas comunes de Angular
    FormsModule, // Permite usar formularios
    IonicModule, // Permite usar componentes de Ionic como IonContent, IonItem, etc.
    TranslateModule, // Permite usar el pipe 'translate'
    HeaderComponent, // Permite usar el componente Header
    IonRouterLink
  ]
})
export class HomePage implements OnInit {

  map: L.Map | null = null;
  addressName: string = '';
  distance: string = '';

  constructor(
    private geo: GeolocationService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadMap();
    this.fixLeafletIconPath();
  }

  async loadMap() {
    await this.geo.getCurrentPosition().then((position: { lat: number, lng: number } | null) => {
      if (position) {
        // Configuramos el centro del mapa y el nivel de zoom
        this.map = L.map('mapId').setView([position.lat, position.lng], 50);

        // Cargamos el mapa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        
        // Ir a mi ubicación
        this.goToMyPosition();
      } else {
        console.log('Posición geográfica desconocida');
      }
    }).catch((error) => {
      console.log('Error al obtener la posición geográfica');
    });
  }

  goToDUOC() {
    this.goToPosition(-33.44703, -70.65762, 50, 'Instituto DUOC Padre Alonso de Ovalle');
  }

  async goToMyPosition() {
    this.geo.getCurrentPosition().then((position: { lat: number, lng: number } | null) => {
      if (position) {
        this.goToPosition(position.lat, position.lng, 50, 'Mi ubicación');
      }
    });
  }

  // Función para cerrar sesión
  logout() {
    this.authService.logout();
  }

  goToPosition(lat: number, lng: number, zoom: number, popupText: string) {
    if (this.map) {
      // Centrar el mapa en las coordenadas proporcionadas
      this.map.setView([lat, lng], zoom);

      // Agregar un marcador en las coordenadas proporcionadas
      const marker = L.marker([lat, lng]).addTo(this.map);
      marker.bindPopup(popupText).openPopup();
    }
  }

  async getMyAddress(lat: number, lng: number) {
    this.geo.getPlaceFromCoordinates(lat, lng).subscribe({
      next: (value: any) => {
        this.addressName = value.display_name;
      },
      error: (error: any) => {
        console.log(error);
        this.addressName = '';
      }
    });
  }

  showRouteToDuoc() {
    this.geo.getCurrentPosition().then((position: { lat: number, lng: number } | null) => {
      if (position) {
        this.goToPosition(position.lat, position.lng, 50, 'Mi ubicación');
        this.getRoute({ lat: position.lat, lng: position.lng }, { lat: -33.44703, lng: -70.65762 }, "walking");
      }
    });
  }

  getRoute(start: { lat: number, lng: number }, end: { lat: number, lng: number }, mode: 'driving' | 'walking') {
    const url = `https://router.project-osrm.org/route/v1/${mode}/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;

    this.http.get(url).subscribe((response: any) => {
      if (this.map) {
        const routeCoords = response.routes[0].geometry.coordinates;
        const routeLatLngs = routeCoords.map((coord: [number, number]) => [coord[1], coord[0]]);
        const routeLine = L.polyline(routeLatLngs, { color: 'blue', weight: 5 }).addTo(this.map);
        this.map.fitBounds(routeLine.getBounds());

        const distance = response.routes[0].distance / 1000; // Distancia en kilómetros
        const duration = response.routes[0].duration / 60;   // Duración en minutos

        this.distance = `Distancia: ${distance.toFixed(2)} km, Estimado: ${duration.toFixed(2)} minutos`;
      }
    });
  }

  fixLeafletIconPath() {
    const iconDefault = L.icon({
      iconUrl: 'assets/leaflet/img/marker-icon.png',
      shadowUrl: 'assets/leaflet/img/marker-shadow.png',
    });
    
    L.Marker.prototype.options.icon = iconDefault;
  }
}
