import {Component} from '@angular/core';
import {Velo} from "../model/velo-model";
import {VeloService} from "../services/velo.service";
import {Router} from "@angular/router";
import {Type} from "../model/type.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-ajout-velo',
  templateUrl: './ajout-velo.component.html'
})
export class AjoutVeloComponent {
  newVelo = new Velo();
  message: string = "";
  types! : Type[];
  newIdType! : number;
  newType! : Type;

  constructor(private veloService: VeloService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.veloService.listeType().subscribe((typs) => {
      this.types = typs;
      console.log(typs);
    });
  }


  ajoutVelo() {
    this.newVelo.type = this.types.find(
      (t) => t.idType == this.newIdType
    );
    this.veloService.ajouterVelo(this.newVelo).subscribe((velo) => {
      this.router.navigate(['velos']);
    })
    // this.message = "Velo ajouté avec succès !";

  }
}
