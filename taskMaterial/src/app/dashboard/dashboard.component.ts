import { Component, OnChanges, OnInit,ViewChild } from '@angular/core';
import { TableService } from '../table.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogformComponent } from '../dialogform/dialogform.component';

export interface detailedData {
  Product: string;
  productId: string;
  Module: string;
  ModuleId: string;
  Modulename: string;
  Learnersaccessed: string;
  Avgtimespent: string;
  AvgModuleactivitiescompleted: string;
  Avgofquizattempts: string;
  AvgLastquizscore: string;
  Avgquizscore: string;
  Lowquizscore: string;
  Highquizscore: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //decorator used to obtain a refernce to a child component or directive within a parent component
  @ViewChild(MatPaginator) paginator!:MatPaginator//reference the MatPaginator component from angular material
  @ViewChild(MatSort, { static: true }) sort!:MatSort
  students:detailedData[]=[];
  order:boolean=false;
  

  displayedColumns:string[]=['Product', 'productId',
  'Module',
  'ModuleId',
  'Modulename',
  'Learnersaccessed',
  'Avgtimespent',
  'AvgModuleactivitiescompleted',
  'Avgofquizattempts',
  'AvgLastquizscore',
  'Avgquizscore',
  'Lowquizscore',
  'Highquizscore',
  'action'
]
  // dataSource = this.students;
  dataSource!:MatTableDataSource<any>
   
  sortedData!:detailedData[];

constructor(private http:HttpClient,public dialog:MatDialog, private tableService: TableService) {
  // this.sortedData=this.students.slice();
 }

openDialog(){
  let dialogRef=this.dialog.open(DialogformComponent,{
    disableClose:true,
  });
  dialogRef.afterClosed().subscribe(result=>{
    // if(result){
    //   this.dataSource.data.push(result);
      
    // }
    console.log(this.tableService.newDataEvent)
    this.students.push(this.tableService.newDataEvent);
    this.dataSource = new MatTableDataSource(this.students);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
    console.log(this.students);
    console.log(`Dialog result :${result}`);
  })
}
deleteRow(data: any) {
  var rowid = this.dataSource.filteredData.indexOf(data)
    if (rowid > -1) {
    if (confirm("Are you sure you want to delete this item?")) {
    this.dataSource.filteredData.splice(rowid, 2);

    this.dataSource._updateChangeSubscription();
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }
}
}

  private base_url:string='assets/data.json';
  getData(){
    this.http.get<any>(this.base_url).subscribe(data=>{
      this.dataSource = new MatTableDataSource(data.rowdata);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
      this.students=data.rowdata;
      
    })
  }

  // deleteRow(Product: any) {
  //   if (confirm("Are you sure you want to delete this item?")) {
  //     console.log('enterd delete')
  //     const index = this.students.indexOf(Product);
  //     this.students.splice(index, 1);
      
  //     console.log(this.students);
      
  //   }
  // }
    // this.selectedIndex--;
    // this.getAllEmployee();
    // this.ngOnInit();
    
  

  

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getData();
      // console.log(data);
      // this.posts=data;
      // this.dataSource=new MatTableDataSource(this.posts)
    
  }
  // deleteRow(element: any) {
  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     width: '250px',
  //     data: { message: 'Are you sure you want to delete this row?' }
  //   });
  
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       const index = this.dataSource.data.indexOf(element);
  //       this.dataSource.data.splice(index, 1);
        
  //     }
  //   });
  // }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //trim removes the extra white space and does not make changes in original string
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //as unknown means variable type is not known and can have any value
    this.students=this.dataSource as unknown as detailedData[];
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

// sortData(formcolumn:any){
//  if (formcolumn == 'Modulename') {

//     if (this.order) {
//       // console.log("here");
//       let newarr = this.students.sort((a, b) => {
//         let str1 = String(a[formcolumn.valueOf()]);
//         let str2 = String(b[formcolumn.valueOf()]);
//         console.log(this.students);
//         // 'Module 16-Body Systems: Female Reproductive—Pregnancy and Birth'
//         // 'Module 15-Body Systems: Female Reproductive—Pregnancy and Birth'
//         str1 = str1.substring(str1.indexOf(' ') + 1, str1.indexOf('-'))
//         str2 = str2.substring(str2.indexOf(' ') + 1, str2.indexOf('-'))
//         console.log(str1, str2);

//         return +str1 - (+str2);
//       })
//       this.students = newarr;
//     }
//     else {

//       let newarr = this.students.sort((a, b) => {
//         let str1:string = String(a[formcolumn.valueOf()]);
//         let str2: string = String(b[formcolumn.valueOf()]);
//         str1 = str1.substring(str1.indexOf(' ') + 1, str1.indexOf('-'))
//         str2 = str2.substring(str2.indexOf(' ') + 1, str2.indexOf('-'))
//         console.log(str1, str2);

//         return +str2 - +str1;
//       })
//       this.students = newarr;

//     }
//     this.order = !this.order;
//   }
// }





ngAfterViewInit() {
  // this.dataSource.sort = this.sort;
  
}

sortData(sort: Sort) {
  const data = this.students.slice();
  if (!sort.active || sort.direction === '') {
    this.sortedData = data;
    return;
  }

  this.sortedData = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'Modulename': return compareModulename(a.Modulename, b.Modulename, isAsc);
      case 'ModuleId':return compare(a.ModuleId,b.ModuleId,isAsc);
      case 'Product':return compare(a.Product,b.Product,isAsc);
      case 'productId':return compare(a.productId,b.productId,isAsc);
      case 'Module':return compare(a.Module,b.Module,isAsc);
      // case 'age': return compare(a.age, b.age, isAsc);
      default: return 0;
    }
  });
  this.dataSource=new MatTableDataSource(this.sortedData);
}
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function compareModulename(a: string, b: string, isAsc: boolean) {


  if (isAsc) {
    a = a.substring(a.indexOf(' ') + 1, a.indexOf('-'))
    b = b.substring(b.indexOf(' ') + 1, b.indexOf('-'))
    console.log("entered if");

    return +a - (+b);
  }
  else {
    a = a.substring(a.indexOf(' ') + 1, a.indexOf('-'))
    b = b.substring(b.indexOf(' ') + 1, b.indexOf('-'))
    console.log("entered else");

    return +b - (+a);
  }
}


