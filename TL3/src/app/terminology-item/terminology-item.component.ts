import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';;
import { Terminology } from '../shared/terminology';
import { TerminologyService } from '../shared/terminology.service';

@Component({
  selector: 'tr.app-terminology-item',
  templateUrl: './terminology-item.component.html',
  styleUrls: ['./terminology-item.component.css']
})
export class TerminologyItemComponent implements OnInit {
  @Output()
  deleted = new EventEmitter<Terminology>();

  delete() {
    this.deleted.emit(this.terminology);
  }
  
  @Input() terminology: Terminology | undefined; 
  @Input() terminologies!: Terminology[] ;


  changeTerminology(terminology: Terminology) {
    this.terminology = terminology;
  }

  constructor(private terminologyService: TerminologyService) { }

 
 
  ngOnInit(): void {
  
  }

 

}
