import { Component, Input, OnInit } from '@angular/core';
import { Terminology } from '../shared/terminology';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TerminologyService } from '../shared/terminology.service';

@Component({
  selector: 'app-terminology-edit',
  templateUrl: './terminology-edit.component.html',
  styleUrls: ['./terminology-edit.component.css']
})
export class TerminologyEditComponent implements OnInit {
  fieldsEmtpy: Boolean = false;
  terminologies: Terminology[] = []

  @Input() terminology: Terminology | undefined; 
  constructor(
    private route: ActivatedRoute, 
    private terminologyService: TerminologyService,
    private location: Location) {
   }

  ngOnInit(): void {
    this.getTerminologyById();
  }

  /**
   * Gets a terminology by its id, which is specified in the url.
   * Once the terminology is fetchecd from the server, the local terminology
   * variable is set to the fetched terminology item.
   */
  getTerminologyById() {
    const id = this.route.snapshot.paramMap.get('id');
    this.terminologyService.getTerminologyById(id)
      .then(res => this.terminology = res)
    }

  /**
   * At save button click, the changes that were made for the terminology item are saved.
   * If a field in the form is not filled in correctly, pressing the save button will have 
   * no effect except for prompting the user to fill in the form properly.
   * If everything was filled in correctly, the user, after gets redirected to the overview page.
   * 
   * @returns Nothing if the input fields were not filled in correclty.
   */
  save(): void {
    if (this.terminology) {
      if (!this.terminology.title || !this.terminology.desc || !this.terminology.creator || !this.terminology.chapter) {
        this.fieldsEmtpy = true;
        return;
      }
      this.terminologyService.updateData(this.terminology._id, this.terminology)
      
        this.goBack();
    }
  }

  /** 
   * Redirects the user to the previous browser location.
   */
  goBack() {
    this.location.back();
  }


}