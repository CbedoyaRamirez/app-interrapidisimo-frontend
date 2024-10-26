import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/services/util.services';

@Component({
  selector: 'app-global-loading',
  templateUrl: './global-loading.component.html',
  styleUrls: ['./global-loading.component.scss']
})
export class GlobalLoadingComponent implements OnInit {

  loading: boolean = true;

  constructor(private utilService: UtilService) { 
    this.utilService.getGlobalLoading().subscribe((resp) => {
      this.loading = resp;
    })
  }

  ngOnInit(): void {
    //this.loading = true;
  }

}
