import { InjectionToken } from "@angular/core";
import { IPostService } from "./posts/iposts.service";
import { ITemaService } from "./tema/itema.service";
import { ISnackbarManagerService } from "./isnackbar-manager.service";
import { IDialogManagerService } from "./idialog-manager.service";

export const SERVICES_TOKEN = {
    HTTP: {
        POST: new InjectionToken<IPostService>('SERVICES_TOKEN.HTTP.POST'),
        TEMA: new InjectionToken<ITemaService>('SERVICES_TOKEN.HTTP.TEMA'),
    },
    SNACKBAR: new InjectionToken<ISnackbarManagerService>('SERVICES_TOKEN.SNACKBAR'),
    DIALOG: new InjectionToken<IDialogManagerService>('SERVICES_TOKEN.DIALOG')
}
