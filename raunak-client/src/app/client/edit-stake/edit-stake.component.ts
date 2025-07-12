import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { AdminService } from 'src/app/services/admin.service';
import { ClientService } from 'src/app/services/client.service';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-stake',
  templateUrl: './edit-stake.component.html',
  styleUrls: ['./edit-stake.component.css']
})
export class EditStakeComponent {

  user_data: any;
  stakesValues: any;
  chipEntries: any;

  constructor(private sharedServices: SharedService, private adminService: AdminService, private clientService: ClientService) {
    this.user_data = this.adminService.getLocalStorageUser();
    console.log(this.user_data, "this.user_data");
  }

  ngOnInit() {
    this.getStakes();
  }


  async getStakes() {
    try {
      const result: any = await firstValueFrom(this.sharedServices.getStakes());
      const stakesData = result.filter((item: any) => {
        return item?.user_id == this.user_data?.user_id;
      });
      this.stakesValues = stakesData[0]?.stake_value;

      //converting from object {"100":100 } --> ["100":100] --> [{key:"100", value:100}]

      this.chipEntries = Object.entries(this.stakesValues).map(([key, value]) => ({ key, value }));

      console.log(this.chipEntries, "this.stakesValues");

    } catch (error) {
      console.error(error);
    }
  }


  async updateStakes() {
    const chipsToSave: any = {};
    const chipsObj: any = {
      user_id: Number(this.user_data?.user_id),
      chips: {}
    }
    this.chipEntries.forEach((entry: any) => {
      chipsToSave[entry.key] = Number(entry.value);
    })

    chipsObj.chips = chipsToSave;

    const result: any = await firstValueFrom(this.clientService.updateStakes(chipsObj));
    console.log(result, 'chipsObj')
    if (result) {
      await Swal.fire({
        position: "center",
        icon: "success",
        title: `${result?.message}!`,
        showConfirmButton: false,
        timer: 1000
      });
      this.getStakes();
    }
  }

}
