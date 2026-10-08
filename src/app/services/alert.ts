import { inject, Service } from '@angular/core';
import { AlertController } from '@ionic/angular';

// @Service(): Es un decorador que marca la clase como un servicio
// que puede ser inyectado en otros componentes o servicios.

@Service()
export class Alert {
  // Inyección de dependencias: Se inyecta el servicio AlertController de Ionic
  // inject(): es una forma de injectar dependencias en Angular.
  private alertController: AlertController = inject(AlertController);

  async alertMessage(
    header: string, // Título de la alerta
    subHeader: string, // Subtítulo de la alerta
    message: string // Mensaje de la alerta
  ) {
    const alert = await this.alertController.create({
      // Opción 1: header: header,
      // Opción 2
      header,
      subHeader,
      message,
      buttons: ['Ok'],
    });

    await alert.present();
  }
}
