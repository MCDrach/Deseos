import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  constructor(
    private deseosService: DeseosService,

  ) { 
    // this.deseosService.obtenerLista
  }

  ngOnInit() {
  }

}
