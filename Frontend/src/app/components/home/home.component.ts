import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { countries } from 'src/app/models/code-country';
import { time_place } from 'src/app/models/time-place';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  url_Api: string = 'https://api.openweathermap.org/data/2.5/weather?appid';
  key_Api: string = 'caffae02abcf570a374727be813eeefd';

  place: string = 'armenia';
  country: string = 'CO';
  fecha: any;
  hora: any;
  data: any = '';
  weather: string = '';
  weatherIconUrl: string = '';
  backgroundColor: string = '';
  countries: any = countries;
  time: any = time_place;
  form: FormGroup;
  area: string = '';

  constructor(
    private fb: FormBuilder,
    private client: ClientService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTime(this.country);

    this.form = this.fb.group({
      place: ['', Validators.required],
      country: ['', Validators.required],
    });
    console.log("place " + this.place);

    this.client.getRequest(`${this.url_Api}=${this.key_Api}&q=${this.place},${this.country}&lang=es`)
      .subscribe(
        {
          next: (response: any) => {
            this.data = response;

            this.checkWeather(
              response.weather[0].main,
              response.weather[0].icon
            );
          },
          error: (error: any) => {
            console.log(error);
          },
        }
      );
  }

  onSubmit() {
    if (this.form.valid) {

      this.getTime(this.form.value.country);

      this.client.getRequest(`${this.url_Api}=${this.key_Api}&q=${this.form.value.place},${this.form.value.country}&lang=es`
        )
        .subscribe({
          next: (response: any) => {

            this.data = response;
            this.checkWeather(
              response.weather[0].main,
              response.weather[0].icon
            );
          },
          error: (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: '¡La cuidad ingresada no es valida!',
            });
          },
        });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: '¡Por favor complete todos los campos!',
      });
    }
  }

  checkWeather = (weather: string, weatherIcon: string) => {

    if (weather === 'Thunderstorm') {
      this.weather = 'Tormenta eléctrica';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    } else if (weather === 'Drizzle') {
      this.weather = 'Llovizna';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    } else if (weather === 'Rain') {
      this.weather = 'Lluvia';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    } else if (weather === 'Snow') {
      this.weather = 'Nieve';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    } else if (weather === 'Mist') {
      this.weather = 'Niebla';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    } else if (weather === 'Smoke') {
      this.weather = 'Humo';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    } else if (weather === 'Haze') {
      this.weather = 'Neblina';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    } else if (weather === 'Dust') {
      this.weather = 'Polvo en suspensión';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    } else if (weather === 'Fog') {
      this.weather = 'Niebla densa';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    } else if (weather === 'Sand') {
      this.weather = 'Arena en suspensión';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    } else if (weather === 'Ash') {
      this.weather = 'Ceniza en suspensión';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    } else if (weather === 'Squall') {
      this.weather = 'Ráfaga';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    } else if (weather === 'Tornado') {
      this.weather = 'Tornado';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    } else if (weather === 'Clear') {
      this.weather = 'Cielo despejado';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    } else if (weather === 'Clouds') {
      this.weather = 'Nubes';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    }
  };

  getTime(code: string) {

    this.time.forEach((e) => {
      if (code === e.country) {

        this.area = e.area;
        this.place = e.place;
      }
    });

    setInterval(() => {
      this.client.getInfo(this.area, this.place).subscribe({
        next: (data) => {
          this.hora = data.datetime.slice(11, 19);
          this.fecha = data.datetime.slice(0, 10);
        },
      });
    }, 1000);

  }

}
