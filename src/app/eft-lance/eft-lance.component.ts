import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eft-lance',
  templateUrl: './eft-lance.component.html',
  styleUrls: ['./eft-lance.component.css']
})
export class EftLanceComponent implements OnInit {

  isProgressVisible: boolean;
  lancerForm: FormGroup;
  firebaseErrorMessage: string;

  constructor() { }

  ngOnInit(): void {
  }

  efetuarLancamento(){

  }

}
