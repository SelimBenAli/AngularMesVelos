import {Component} from '@angular/core';
import {Velo} from "../model/velo-model";
import {VeloService} from "../services/velo.service";
import {Type} from "../model/type.model";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-velos',
  templateUrl: './velos.component.html'
})
export class VelosComponent {
  velos?: Velo[];

  constructor(private velosService: VeloService, public authService: AuthService) {

  }

  ngOnInit(): void {
    this.chargerVelos()
  }

  chargerVelos() {
    this.velosService.listeVelo().subscribe(prods => {
      console.log(prods);
      this.velos = prods;
    });
  }

  supprimerVelo(p: Velo) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.velosService.supprimerVelo(p.idVelo!).subscribe(() => {
        console.log("produit supprimé");
        this.chargerVelos();
      });
  }
}
