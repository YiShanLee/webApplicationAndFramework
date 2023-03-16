import { Component, OnInit } from '@angular/core';
import { Terminology } from '../shared/terminology';
import { TerminologyService } from '../shared/terminology.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-terminology-add',
  templateUrl: './terminology-add.component.html',
  styleUrls: ['./terminology-add.component.css']
})
export class TerminologyAddComponent implements OnInit {
  fieldsEmpty: Boolean = false;

  constructor(private terminologyService: TerminologyService, private location: Location) { }

  ngOnInit(): void {
  }

  /**
   * Verifies that all input fields in the adding form are filled in.
   * After that, the terminilogy gets added to the database.
   * 
   * @param title - The title of the new terminology
   * @param desc  - The description/ explanation of the new terminology
   * @param creator - The person who created the new terminology entry
   * @param chapter - The chapter in which the terminology is situated within the WebT module
   * @returns - Nothing, if the form was not filled
   */
  add(title: string, desc: string, creator: string, chapter: string): void {
    if (!title || !desc || !creator || !chapter) {
      this.fieldsEmpty = true;
      return;
    }
    
    this.terminologyService.addEntry( { title, desc, chapter, creator} as Terminology)
      .then(response => this.terminologyService.makeRequest())
      .then((res) => this.goBack());
    
  }

  goBack(): void {
    this.location.back();
  }

}
