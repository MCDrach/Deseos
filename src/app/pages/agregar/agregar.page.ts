import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = '';
  constructor(
    private deseosService: DeseosService,
    private activeRouter: ActivatedRoute,
    public alertController: AlertController
  ) {


    const id = this.activeRouter.snapshot.paramMap.get('id');

    this.lista = this.deseosService.obtenerLista(id);

  }

  ngOnInit() {
  }

  agregarItem() {
    if ( this.nombreItem.length === 0) {
      return;
    }
    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);
    this.deseosService.guardarStorage();
    this.nombreItem = '';
  }
  cambioCheck(item: ListaItem) {
    const pendiente = this.lista.items
                          .filter( item => !item.completado).length;

    if (pendiente === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    console.log(this.deseosService.listas);

    this.deseosService.guardarStorage();
  }

  async borrar(i: number) {

    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: 'Desea eliminar Permanentemente esta Tarea',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: () => {
            this.lista.items.splice(i, 1);
            this.deseosService.guardarStorage();
          }
        }
      ]
    });

    await alert.present();
  }

}
