import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  height: number = 0;
  weight: number = 0;
  resultNumber: number = 0;
  dataText: any = {
    "bajo_peso": {
      text: "Usted se encuentra en bajo peso",
      color: "#AFCAFF"
    },
    "normal": {
      text: "Su peso es el adecuado, felicidades",
      color: "#C2E2AA"
    },
    "pre_obesidad":{
      text: "Usted se encuentra en pre-obesidad",
      color: "#FFFAB7"
    },
    "obesidad_clas1":{
      text: "Usted se encuentra en obesidad clase 1",
      color: "#FEDFAA"
    },
    "obesidad_clas2":{
      text: "Usted se encuentra en obesidad clase 2, debería asistir a un médico",
      color: "#F0A096"
    },
    "obesidad_clas3":{
      text: "Usted se encuentra en obesidad clase 2",
      color: "#F7BCD6"
    }
  };
  finalData: any = null

  calcularRestante(type: string){
    if (type == 'obesidad'){
      return 23.5 * (this.height ** 2)
    }
    else{
      return 18.7 * (this.height ** 2)
    }
  }

  handlerCalcular(){
    if (this.weight == 0 || this.height == 0){
      alert('ERROR DE DATOS')
      return
    }

    this.resultNumber = this.weight / this.height ** 2

    let dataSalud

    if (this.resultNumber < 18.5){
      dataSalud = this.dataText.bajo_peso
      dataSalud.extra = {
        "aumentar": (this.calcularRestante("flaco") - this.weight).toFixed(1),
        "disminuir": 0,
        "goal": this.calcularRestante("flaco").toFixed(1) 
      }
    }
    else if (this.resultNumber >= 18.5 && this.resultNumber <= 24.9){
      dataSalud = this.dataText.normal
      dataSalud.extra = {
        "aumentar": 0,
        "disminuir": 0,
        "goal": null
      }
    }
    else if (this.resultNumber >= 25 && this.resultNumber <= 29.9){
      dataSalud = this.dataText.pre_obesidad
      dataSalud.extra = {
        "aumentar": 0,
        "disminuir": (this.calcularRestante("obesidad") - this.weight).toFixed(1),
        "goal": this.calcularRestante("obesidad").toFixed(1) 
      }
    }
    // OBESIDAD TIPO 1

    else if (this.resultNumber >= 30 && this.resultNumber <= 34.9){
      dataSalud = this.dataText.obesidad_clas1
      dataSalud.extra = {
        "aumentar": 0,
        "disminuir": (this.calcularRestante("obesidad") - this.weight).toFixed(1),
        "goal": this.calcularRestante("obesidad").toFixed(1) 
      }
    }
    // OBESIDAD TIPO 2

    else if (this.resultNumber >= 35 && this.resultNumber <= 39.9){
      dataSalud = this.dataText.obesidad_clas2
      dataSalud.extra = {
        "aumentar": 0,
        "disminuir": (this.calcularRestante("obesidad") - this.weight).toFixed(1),
        "goal": this.calcularRestante("obesidad").toFixed(1) 
      }
    }
    // OBESIDAD TIPO 3
    else if (this.resultNumber > 40){
      dataSalud = this.dataText.obesidad_clas3
      dataSalud.extra = {
        "aumentar": 0,
        "disminuir": (this.calcularRestante("obesidad") - this.weight).toFixed(1),
        "goal": this.calcularRestante("obesidad").toFixed(1) 
      }
    }

    dataSalud.score = this.resultNumber.toFixed(2)

    this.finalData = dataSalud

  }
}
