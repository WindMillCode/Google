import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-ag-grid-holder',
    templateUrl: './ag-grid-holder.component.html',
    styleUrls: ['./ag-grid-holder.component.css']
})
export class AgGridHolderComponent implements OnInit {

    constructor() { }
    columnDefs = [
        { field: 'make' },
        { field: 'model' },
        { field: 'price' }
    ];

    rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];
    ngOnInit(): void {
    }

}
