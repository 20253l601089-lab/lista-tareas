import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
  IonList,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

// Iportación de Angular
import { FormsModule } from '@angular/forms';

// Importación del servicio Alert
import { Alert } from '../../services/alert';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonList,
    IonLabel,
    IonButton,
    IonIcon,
    IonInput,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FormsModule,
  ],
})
export class HomePage {
  // Injectamos el servicio Alert en
  // HomePage para poder utilizarlo en esta página.
  private alertService: Alert = inject(Alert);

  public task: string = '';
  public tasks: string[] = [
    'Comprar Leche',
    'Dormir',
    'Descansar',
    'Estudiar',
    'Ver la Novela',
  ];

  constructor() {
    addIcons({
      addOutline,
    });
  }

  addTask() {
    console.log('Variable: ', this.task);
    if (!this.ifExistTask(this.task)) {
      this.tasks.push(this.task);
      console.log('Array: ', this.tasks);
      this.task = '';
      console.log('Tarea agregada correctamente');
      this.alertService.alertMessage(
        'Exito',
        'Registro de Tareas',
        'La tarea se ha agregado correctamente'
      );
    } else {
      console.log('La tarea ya existe');
      this.alertService.alertMessage(
        'Error',
        'Registro de Tareas',
        'La tarea ya existe'
      );
    }
  }

  private ifExistTask(task: string) {
    // Verifica si la tarea ya existe en el array de tareas
    // Con el metodo find() se busca en el array de tareas si existe la tarea que se le pasa como parámetro
    return this.tasks.find(
      // Comparamos la tarea que queremos agregar con las tareas del arreglo
      // toUpperCase(): Convertir a mayúsculaspara que la comparación
      // no sea sensible a mayúsculas y minúsculas
      // trim(): Elimina los espacios en blanco al inicio
      //  y al final de la cadena
      (item: string) => item.toLowerCase().trim() === task.toLowerCase().trim()
    );
  }
}