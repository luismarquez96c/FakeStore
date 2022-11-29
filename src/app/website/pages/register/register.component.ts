import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OnExit } from 'src/app/guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnExit {

  constructor() { }
  
  onExit(): Observable<boolean> | Promise<boolean> | boolean {
    console.log("¡logica del lado del componente!");
    const rta = confirm('estas seguro de salid?');
    return rta;
  }


  ngOnInit(): void {
  }

}
