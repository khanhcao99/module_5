import { Component, OnInit } from '@angular/core';
import {Tour} from "../model/tour";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TourService} from "../service/tour.service";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {
  tours: Tour[] = []
  idt?: number
  tourForm!: FormGroup
  constructor(private tourService: TourService,
              private formGroup: FormBuilder) { }

  ngOnInit(): void {
    this.displayTour()
    this.tourForm = this.formGroup.group({
      id: [''],
      title: [''],
      price: [''],
      description: ['']
    })
  }

  displayTour(){
    this.tourService.findAllTour().subscribe(value => {
      this.tours = value
    })
  }

  displayFormCreate() {
    let modal = document.getElementById("myModal");
    // @ts-ignore
    modal.style.display = "block";
    // @ts-ignore
    this.setUpFormCreate()

  }

  setUpFormCreate() {
    // @ts-ignore
    document.getElementById("title").value = ""
    // @ts-ignore
    document.getElementById("price").value = ""
    // @ts-ignore
    document.getElementById("description").value = ""
    // @ts-ignore
    document.getElementById("titleFrom").innerHTML = "Tạo mới chuyến du lịch";
    // @ts-ignore
    document.getElementById("buttonCreate")!.hidden = false
    // @ts-ignore
    document.getElementById("buttonUpdate")!.hidden = true

  }

  setUpFormUpdate(tour: Tour) {
    this.tourForm.patchValue(tour)
    // @ts-ignore
    document.getElementById("titleFrom").innerHTML = "Chỉnh sửa chuyến du lịch";
    // @ts-ignore
    document.getElementById("buttonCreate")!.hidden = true
    // @ts-ignore
    document.getElementById("buttonUpdate")!.hidden = false
    // @ts-ignore
    document.getElementById("myModal").style.display = "block"
  }

  closeFromCreate() {
    let modal = document.getElementById("myModal");
    // @ts-ignore
    modal.style.display = "none";
    // @ts-ignore
    document.getElementById("detailModal").style.display = "none"
  }

  createTour() {
    let tour = {
      id: this.tourForm.value.id,
      title: this.tourForm.value.title,
      price: this.tourForm.value.price,
      description: this.tourForm.value.description,
    }
    this.tourService.createTour(tour).subscribe(value => {
      this.createSuccess()
      // @ts-ignore
      document.getElementById("myModal").style.display = "none"
      this.displayTour()
      console.log(value)
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Tạo mới thất bại',
        showConfirmButton: false,
        timer: 1500
      })
    })
    // @ts-ignore
    document.getElementById("rest").click()
  }

  createSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Tạo mới thành công',
      showConfirmButton: false,
      timer: 1500
    })
  }

  updateForm(id?: number) {
    this.idt = id;
    this.tourService.getTourById(this.idt).subscribe(value => {
      this.setUpFormUpdate(value)
    })
  }

  updateTour(){
    let tour = {
      id: this.tourForm.value.id,
      title: this.tourForm.value.title,
      price: this.tourForm.value.price,
      description: this.tourForm.value.description,
    }
    Swal.fire({
      title: 'Bản có chắc chắn muốn chỉnh sửa?',
      showDenyButton: true,
      confirmButtonText: 'Chỉnh sửa',
      denyButtonText: `Hủy`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.tourService.updateTour(this.idt,tour).subscribe(value => {
          this.setUpFormUpdate(value)
          // @ts-ignore
          document.getElementById("myModal").style.display = "none"
          this.displayTour()
        }, error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Chỉnh sửa thất bại',
            showConfirmButton: false,
            timer: 1500
          })
        })
        Swal.fire('Chỉnh sửa thành công!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Hủy bỏ!', '', 'info')
      }
    })

  }

  deleteProvince(id?: number){
    this.idt = id
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: "Dữ liệu sẽ không thể khôi phục!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý!',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tourService.deleteTour(id).subscribe(value => {
          this.displayTour()
        }, error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Xóa thất bại',
            showConfirmButton: false,
            timer: 1500
          })
        })
        Swal.fire(
          'Xóa thành công!',
          'Dữ liệu đã bị xóa bỏ',
          'success'
        )
      }
    })
  }

  detailTour(id?: number){
    this.tourService.getTourById(id).subscribe(value => {
      // @ts-ignore
      document.getElementById("titleDetail").innerHTML = "Tên Chuyển Du Lịch: " + value.title
      // @ts-ignore
      document.getElementById("priceDetail").innerHTML = "Giá : " + value.price
      // @ts-ignore
      document.getElementById("descriptionDetail").innerHTML = "Mô Tả : " + value.description
      // @ts-ignore
      document.getElementById("detailModal").style.display = "block"
    })
  }

}
