import { InjectionToken } from '@angular/core';

const authorDefaultAvatar = '/assets/no-avatar.svg';

export const AUTHOR_DEFAULT_AVATAR_TOKEN = new InjectionToken<string>('authorDefaultAvatarUrl',
  {
    factory: () => authorDefaultAvatar,
  }
);
