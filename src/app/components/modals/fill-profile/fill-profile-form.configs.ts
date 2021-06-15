import { UserRole } from '../../../models/user/user-roles';
import { User } from '../../../models/user/user';
import { SocialType } from '../../../models/user/social-types';

export function getFields (social) {
    const fields: any = [
        {
            key: 'role',
            type: 'radio',
            templateOptions: {
                label: 'Role',
                placeholder: 'Choose role',
                required: true,
                options: [
                    { value: UserRole.Customer, label: 'Customer' },
                    { value: UserRole.Provider, label: 'Provider' }
                ],
            }
        },
    ];

    if (social === SocialType.Facebook) {
        return fields.concat({
            key: 'email',
            type: 'input',
            templateOptions: {
                type: 'email',
                label: 'Email address',
                placeholder: 'Enter email',
                required: true,
            },
            validators: {
                validation: ['email']
            },
            validationMessages: [
                {
                    name: 'email', message: 'Email is in invalid format'
                }
            ]
        });
    }
    return fields;
}

export function getModel (user: User, social: SocialType, email: string) {
    const model: any = {
        role: UserRole.Customer
    };

    if (social === SocialType.Facebook && user.email) {
        model.email = user.email;
    } else if (email) {
        model.email = email;
    }
    return model;
}
