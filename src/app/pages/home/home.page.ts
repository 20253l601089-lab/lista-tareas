import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Necesario para *ngFor
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonItem, 
  IonInput, 
  IonButton, 
  IonIcon,
  IonList,  // <-- Componente para la lista
  IonLabel  // <-- Componente para el texto de la tarea
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonItem, 
    IonInput, 
    IonButton, 
    IonIcon,
    IonList,
    IonLabel
  ],
})
export class HomePage {
  public task: string = '';
  public tasks: string[] = [];

  constructor() {
    addIcons({ addOutline });
  }

  addTask() {
    console.log('Variable: ', this.task);
    this.tasks.push(this.task);
    console.log('Array: ', this.tasks);
    this.task = ''; // Limpia el input para ingresar una nueva tarea
  }
}