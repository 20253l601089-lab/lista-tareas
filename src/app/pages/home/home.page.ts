import { ChangeDetectorRef, Component, inject } from '@angular/core';
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
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonReorder,
  IonReorderGroup,
  ItemReorderEventDetail,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline, trashOutline } from 'ionicons/icons';

// Importación de Angular
import { FormsModule } from '@angular/forms';

import { Preferences } from "@capacitor/preferences";

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
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonReorder,
    IonReorderGroup,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FormsModule,
  ],
})
export class HomePage {
  private alertService: Alert = inject(Alert);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  
  public task: string = '';
  public tasks: string[] = [];

  private readonly KEY_TASKS: string = 'ddr_key_tasks';

  constructor() {
    addIcons({
      addOutline,
      trashOutline,
    });
  }

  // Se ejecuta cada vez que la página va a entrar en pantalla
  ionViewWillEnter() {
    this.loadTasks();
  }

  // Carga las tareas desde Capacitor Preferences
  private loadTasks() {
    Preferences.get({ key: this.KEY_TASKS }).then((res) => {
      if (res.value) {
        this.tasks = JSON.parse(res.value);
      } else {
        this.tasks = [
          'Comprar Leche',
          'Dormir',
          'Descansar',
          'Estudiar',
          'Ver la Novela',
        ];
        this.saveTasks();
      }
      this.cdr.detectChanges();
    });
  }

  // Guarda las tareas actuales en Capacitor Preferences
  private saveTasks() {
    Preferences.set({
      key: this.KEY_TASKS,
      value: JSON.stringify(this.tasks),
    });
  }

  addTask() {
    console.log('Variable: ', this.task);
    if (!this.ifExistTask(this.task)) {
      this.tasks.push(this.task);
      this.saveTasks();
      this.task = '';
      this.alertService.alertMessage(
        'Exito',
        'Registro de Tareas',
        'La tarea se ha agregado correctamente'
      );
    } else {
      this.alertService.alertMessage(
        'Error',
        'Registro de Tareas',
        'La tarea ya existe'
      );
    }
  }

  private ifExistTask(task: string) {
    return this.tasks.find(
      (item: string) => item.toLowerCase().trim() === task.toLowerCase().trim()
    );
  }

  confirmDeleteTask(task: string) {
    this.alertService.alertConfirm(
      'Confirmar',
      'Eliminar Tareas',
      '¿Estás seguro que deseas eliminar esta tarea?',
      () => {
        const index = this.tasks.findIndex(
          (item: string) => item.toLowerCase().trim() === task.toLowerCase().trim()
        );
        if (index !== -1) {
          this.deleteTask(index);
        }
      }
    );
  }

  private deleteTask(index: number) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks.splice(index, 1);
      this.saveTasks();
      this.cdr.detectChanges(); 
    }
  }

  // Función para poder mover/arrastrar los elementos y guardar su nueva posición
  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    const itemToMove = this.tasks.splice(ev.detail.from, 1)[0];
    this.tasks.splice(ev.detail.to, 0, itemToMove);
    ev.detail.complete();
    
    this.saveTasks();
    this.cdr.detectChanges();
  }
}