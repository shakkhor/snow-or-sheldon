import { NgModule } from '@angular/core';
import {
   MatToolbarModule,
   MatIconModule,
   MatSidenavModule,
   MatButtonModule,
   MatListModule,
   MatBadgeModule,
   MatGridListModule,
   MatCardModule,
   MatMenuModule,
   MatDialogModule,
   MatFormFieldModule,
   MatInputModule,
   MatSelectModule,
   MatCheckboxModule, 
   MatRadioModule,
} from '@angular/material';

@NgModule({
   imports: [
       MatToolbarModule,
       MatIconModule,
       MatSidenavModule,
       MatButtonModule,
       MatListModule,
       MatBadgeModule,
       MatGridListModule,
       MatCardModule,
       MatMenuModule,
       MatDialogModule,
       MatFormFieldModule,
       MatInputModule,
       MatSelectModule,
       MatCheckboxModule,
       MatRadioModule, 
       MatDialogModule
   ],
   exports: [
       MatToolbarModule,
       MatIconModule,
       MatSidenavModule,
       MatButtonModule,
       MatListModule,
       MatBadgeModule,
       MatGridListModule,
       MatCardModule,
       MatMenuModule,
       MatDialogModule,
       MatFormFieldModule,
       MatInputModule,
       MatSelectModule,
       MatCheckboxModule,
       MatRadioModule,
       MatDialogModule
   ],
})
export class MaterialModule { }