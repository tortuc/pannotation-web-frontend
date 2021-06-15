import { ChangeDetectionStrategy, Component } from '@angular/core';

interface SocialLink {
    icon: string;
    link: string;
}

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
    readonly socials: SocialLink[] = [
        {
            icon: 'assets/img/socials/ic-facebook-gray.svg',
            link: 'https://www.facebook.com/PanNotation-248671752505263/?modal=admin_todo_tour'
        },
        {
            icon: 'assets/img/socials/ic-instagram-gray.svg',
            link: 'https://www.instagram.com/pannotation'
        }
    ];
}
