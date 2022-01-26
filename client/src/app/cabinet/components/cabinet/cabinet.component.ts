import { Component, Inject, OnInit } from '@angular/core';
import { base64ToFile, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { Observable } from 'rxjs';
import { AUTHOR_DEFAULT_AVATAR_TOKEN } from 'src/app/shared/InjectionTokens/author-default-avatar';
import { CurrentAuthor } from 'src/app/shared/interfaces/current-author.type';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {

  author$: Observable<CurrentAuthor>;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    private authorService: AuthorService,
    @Inject(AUTHOR_DEFAULT_AVATAR_TOKEN)
    public authorDefaultAvatar: string,
  ) { }

  ngOnInit(): void {
    this.author$ = this.authorService.getAuthor();
  }

  // TODO: change after adding imh on backEnd
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    const avatar: any = base64ToFile(this.croppedImage);
    this.authorService.update('61defb80a9e0458257d63baf', avatar).subscribe(data => console.log(data));
  }

  imageLoaded() {
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

}
