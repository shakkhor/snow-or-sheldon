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
   MatSelectModule
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
       MatSelectModule
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
       MatSelectModule
   ],
})
export class MaterialModule { }