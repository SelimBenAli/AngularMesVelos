import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VeloService} from "../services/velo.service";
import {Velo} from "../model/velo-model";
import {Type} from "../model/type.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-maj-velo',
  templateUrl: './maj-velo.component.html',
  styles: []
})
export class MajVeloComponent {
  veloActuelle = new Velo();
  types!: Type[];
  updatedTypeId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private veloService: VeloService
  ) {
  }


  /*ngOnInit() {
    this.mytypes = this.veloService.listeType();
    console.log(this.activatedRoute.snapshot.params['id']);
    this.veloActuelle = this.veloService.consulterVelo(this.activatedRoute.snapshot.params['id']);
    this.updatedTypeId=this.veloActuelle.type.idType;
    console.log(this.veloActuelle);
  }*/

  ngOnInit(): void {
    this.veloService.listeType().subscribe((typs) => {
      this.types = typs;
      console.log('//', typs);
    });


    this.veloService.consulterVelo(this.activatedRoute.snapshot.params['id']).subscribe(prod => {
      this.veloActuelle = prod;
      this.updatedTypeId = this.veloActuelle.type!.idType;

    });
  }

  updateVelo() {
    this.veloActuelle.type = this.types.find(
      (t) => t.idType == this.updatedTypeId
    );
    this.veloService.updateVelo(this.veloActuelle).subscribe((vel) => this.router.navigate(['velos'])
  )

  }
}
