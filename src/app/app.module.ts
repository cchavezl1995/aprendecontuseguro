import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { BlockUIModule } from 'primeng/blockui';
import { SpinnerModule } from 'primeng/spinner';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { StepsModule } from 'primeng/steps';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { CurriculumVitaeComponent } from './components/curriculum-vitae/curriculum-vitae.component';
import { StudyComponent } from './components/study/study.component';
import { EntreviewComponent } from './components/entreview/entreview.component';
import { SalaryComponent } from './components/salary/salary.component';
import { SalaryServiceComponent } from './components/salary/salary-service/salary-service.component';
import { SalaryResultadoComponent } from './components/salary/salary-resultado/salary-resultado.component';
import { JobOffersComponent } from './components/job-offers/job-offers.component';
import { JobOffersServiceComponent } from './components/job-offers/job-offers-service/job-offers-service.component';
import { AdvisoryComponent } from './components/advisory/advisory.component';
import { AdvisoryServiceComponent } from './components/advisory/advisory-service/advisory-service.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DiccionarioPipe } from './pipes/diccionario.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from "./components/home/home.component";
import { ProfileComponent } from './components/profile/profile.component';
import { HelpComponent } from './components/help/help.component';
import { PsicoComponent } from './components/psico/psico.component';
import { SchedulingComponent } from './components/scheduling/scheduling.component';
import { CurriculumHomeComponent } from './components/curriculum-home/curriculum-home.component';
import { BlockLoaderComponent } from './components/block-loader/block-loader.component';
import { StepsComponent } from './components/steps/steps.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { OfertasPipe } from './pipes/ofertas.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { DigitOnlyDirective } from './directives/digit-only-directive';
import { FilterQuestionPipe } from './pipes/filter-question.pipe';
import { DateTimeFormatPipe } from './pipes/date-time-format.pipe';
import { DatepickerPopupDirective } from './directives/datepicker-popup.directive';
import { DigitalBrandingComponent } from './components/digital-branding/digital-branding.component';
import { CoworkingComponent } from './components/coworking/coworking.component';
import { SchedulingIttComponent } from './components/scheduling-itt/scheduling-itt.component';
import { NetworkingComponent } from './components/networking/networking.component';
import { SecurityComponent } from './components/security/security.component';
import { AdvisoryIttComponent } from './components/advisory-itt/advisory-itt.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ArrayFiltersPipe } from './pipes/array-filters.pipe';
import { FaqComponent } from './components/faq/faq.component';
import { SchedulePipe } from './pipes/schedule.pipe';

import { NgSelectModule } from '@ng-select/ng-select';
import { SortablejsModule } from "ngx-sortablejs";
import { LocaleHelper } from './app.locale.helper';
import { FilterArrayByExistsPipe } from './pipes/filter-array-by-exists.pipe';

import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
import { ScoreCreditComponent } from './components/score-credit/score-credit.component';
import { AlertNotificationsComponent } from './components/alert-notifications/alert-notifications.component';
import { EconomyStudyComponent } from './components/economy-study/economy-study.component';
import { FinancialHealthComponent } from './components/financial-health/financial-health.component';
import { PdfComponent } from './components/pdf/pdf.component';
import { ContactHelpComponent } from './components/contact-help/contact-help.component';
import { InterestMaterialComponent } from './components/interest-material/interest-material.component';
import { CookieService } from 'ngx-cookie-service';
import { SwiperComponent, Angular2UsefulSwiperModule } from "angular2-useful-swiper";
import { ClickOutsideModule } from 'ng-click-outside';
import 'bootstrap';
import { VideoMaterialComponent } from './components/video-material/video-material.component';
import { StudyIttComponent } from './components/study-itt/study-itt.component';
import 'crypto-js';
import { AdminComponent } from './components/admin/admin.component';
import { AdminNetworkingComponent } from './components/admin/admin-networking/admin-networking.component';
import { Token } from "./services/token";
import { JwtModule } from '@auth0/angular-jwt';
import { URL } from './config/variables';
import * as CryptoJS from 'crypto-js';
import { Route } from '@angular/compiler/src/core';
import { Routes } from '@angular/router';
import { ServiceScoreCreditComponent } from './components/score-credit/service-score-credit/service-score-credit.component';
import { ScoreCreditEjercicioComponent } from './components/score-credit/score-credit-ejercicio/score-credit-ejercicio.component';
import { ScoreCreditResultadoComponent } from './components/score-credit/score-credit-resultado/score-credit-resultado.component';
import { AlertNotificationsServiceComponent } from './components/alert-notifications/alert-notifications-service/alert-notifications-service.component';
import { AlertNotificationsActiveComponent } from './components/alert-notifications/alert-notifications-active/alert-notifications-active.component';
import { AlertNotificationsConfirmComponent } from './components/alert-notifications/alert-notifications-confirm/alert-notifications-confirm.component';
import { FinancialHealtServiceComponent } from './components/financial-health/financial-healt-service/financial-healt-service.component';
import { FinancialHealthExercicesComponent } from './components/financial-health/financial-health-exercices/financial-health-exercices.component';
import { FinancialHealthExcercice1Component } from './components/financial-health/financial-health-exercices/financial-health-excercice1/financial-health-excercice1.component';
import { FinancialHealthExcercice2Component } from './components/financial-health/financial-health-exercices/financial-health-excercice2/financial-health-excercice2.component';
import { FinancialHealthExcercice3Component } from './components/financial-health/financial-health-exercices/financial-health-excercice3/financial-health-excercice3.component';
import { FinancialHealthExcercice4Component } from './components/financial-health/financial-health-exercices/financial-health-excercice4/financial-health-excercice4.component';
import { FinancialHealthExcercice5Component } from './components/financial-health/financial-health-exercices/financial-health-excercice5/financial-health-excercice5.component';
import { FinancialHealthExcercice6Component } from './components/financial-health/financial-health-exercices/financial-health-excercice6/financial-health-excercice6.component';
import { FinancialHealthExcercice7Component } from './components/financial-health/financial-health-exercices/financial-health-excercice7/financial-health-excercice7.component';
import { FinancialHealthExcercice8Component } from './components/financial-health/financial-health-exercices/financial-health-excercice8/financial-health-excercice8.component';
import { FinancialHealthExcercice9Component } from './components/financial-health/financial-health-exercices/financial-health-excercice9/financial-health-excercice9.component';
import { FinancialHealthExcercice10Component } from './components/financial-health/financial-health-exercices/financial-health-excercice10/financial-health-excercice10.component';
import { EconomyStudyServiceComponent } from './components/economy-study/economy-study-service/economy-study-service.component';
import { EconomyStudyExerciceComponent } from './components/economy-study/economy-study-exercice/economy-study-exercice.component';
import { EconomyStudyCourseComponent } from './components/economy-study/economy-study-exercice/economy-study-course/economy-study-course.component';
import { EconomyStudyCourse1Component } from './components/economy-study/economy-study-exercice/economy-study-course1/economy-study-course1.component';
import { EconomyStudyCourse2Component } from './components/economy-study/economy-study-exercice/economy-study-course2/economy-study-course2.component';
import { SecurityServiceComponent } from './components/security/security-service/security-service.component';
import { SecuritySchedulingComponent } from './components/security/security-scheduling/security-scheduling.component';
import { DigitalBrandingServiceComponent } from './components/digital-branding/digital-branding-service/digital-branding-service.component';
import { DigitalBrandingFormComponent } from './components/digital-branding/digital-branding-form/digital-branding-form.component';
import { DigitalBrandingSchedulingComponent } from './components/digital-branding/digital-branding-scheduling/digital-branding-scheduling.component';
import { AdvisoryIttServiceComponent } from './components/advisory-itt/advisory-itt-service/advisory-itt-service.component';
import { SchedulingFraudeComponent } from './components/scheduling-fraude/scheduling-fraude.component';
import { NetworkingServiceComponent } from './components/networking/networking-service/networking-service.component';
import { NetworkingEventsComponent } from './components/networking/networking-events/networking-events.component';
import { NetworkingEventDetailComponent } from './components/networking/networking-event-detail/networking-event-detail.component';
import { NetworkingCommunityComponent } from './components/networking/networking-community/networking-community.component';
import { NetworkingSchedulingComponent } from './components/networking/networking-scheduling/networking-scheduling.component';
import { CoworkingServiceComponent } from './components/coworking/coworking-service/coworking-service.component';
import { CoworkingformComponent } from './components/coworking/coworkingform/coworkingform.component';
import { CoworkingSchedulingComponent } from './components/coworking/coworking-scheduling/coworking-scheduling.component';
import { PsicoSchedulingComponent } from './components/psico/psico-scheduling/psico-scheduling.component';
import { PsicoTestsComponent } from './components/psico/psico-tests/psico-tests.component';


import { registerLocaleData } from '@angular/common';
import localeEsCo from '@angular/common/locales/es-CO';
import { CurriculumSchedulingComponent } from './components/curriculum-scheduling/curriculum-scheduling.component';
registerLocaleData(localeEsCo);


export function tokenGetter() {
  let token = CryptoJS.AES.decrypt(localStorage.getItem('token'), "eco_scotia").toString(CryptoJS.enc.Utf8);
  // console.log('token app: ', token);
  if (token) {
    return token;
  } else {
    return 'null';
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SettingsComponent,
    LoginRegisterComponent,
    CurriculumVitaeComponent,
    StudyComponent,
    EntreviewComponent,
    SalaryComponent,
    SalaryServiceComponent,
    SalaryResultadoComponent,
    JobOffersComponent,
    JobOffersServiceComponent,
    AdvisoryComponent,
    AdvisoryServiceComponent,
    RegisterComponent,
    LoginComponent,
    DiccionarioPipe,
    HomeComponent,
    ProfileComponent,
    HelpComponent,
    PsicoComponent,
    SchedulingComponent,
    CurriculumHomeComponent,
    BlockLoaderComponent,
    StepsComponent,
    OfertasPipe,
    DigitOnlyDirective,
    FilterQuestionPipe,
    DateTimeFormatPipe,
    DatepickerPopupDirective,
    DigitalBrandingComponent,
    CoworkingComponent,
    SchedulingIttComponent,
    NetworkingComponent,
    SecurityComponent,
    AdvisoryIttComponent,
    ArrayFiltersPipe,
    FaqComponent,
    SchedulePipe,
    ScoreCreditComponent,
    ServiceScoreCreditComponent,
    ScoreCreditEjercicioComponent,
    ScoreCreditResultadoComponent,
    AlertNotificationsComponent,
    EconomyStudyComponent,
    FinancialHealthComponent,
    PdfComponent,
    FilterArrayByExistsPipe, 
    ContactHelpComponent, 
    InterestMaterialComponent, 
    VideoMaterialComponent, 
    StudyIttComponent, 
    AdminComponent, 
    AdminNetworkingComponent, 
    AlertNotificationsServiceComponent,
    AlertNotificationsActiveComponent,
    AlertNotificationsConfirmComponent,
    FinancialHealtServiceComponent,
    FinancialHealthExercicesComponent,
    FinancialHealthExcercice1Component,
    FinancialHealthExcercice2Component,
    FinancialHealthExcercice3Component,
    FinancialHealthExcercice4Component,
    FinancialHealthExcercice5Component,
    FinancialHealthExcercice6Component,
    FinancialHealthExcercice7Component,
    FinancialHealthExcercice8Component,
    FinancialHealthExcercice9Component,
    FinancialHealthExcercice10Component,
    EconomyStudyServiceComponent,
    EconomyStudyExerciceComponent,
    EconomyStudyCourseComponent,
    EconomyStudyCourse1Component,
    EconomyStudyCourse2Component,
    SecurityServiceComponent,
    SecuritySchedulingComponent,
    DigitalBrandingServiceComponent,
    DigitalBrandingFormComponent,
    DigitalBrandingSchedulingComponent,
    AdvisoryIttServiceComponent,
    SchedulingFraudeComponent,
    NetworkingServiceComponent,
    NetworkingEventsComponent,
    NetworkingEventDetailComponent,
    NetworkingCommunityComponent,
    NetworkingSchedulingComponent,
    CoworkingServiceComponent,
    CoworkingformComponent,
    CoworkingSchedulingComponent,
    PsicoSchedulingComponent,
    PsicoTestsComponent,
    CurriculumSchedulingComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StepsModule,
    HttpClientModule,
    PasswordModule,
    FormsModule,
    InputMaskModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CalendarModule,
    BlockUIModule,
    SpinnerModule,

    ProgressSpinnerModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    PopoverModule.forRoot(),
    CheckboxModule,
    NgxPaginationModule,
    TypeaheadModule.forRoot(),
    NgSelectModule,
    Angular2UsefulSwiperModule,
    ClickOutsideModule,
    SortablejsModule.forRoot({ animation: 150 }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [URL],
        blacklistedRoutes: [URL + '/login/*', URL + '/Login/*', URL + '/redirect/', URL + '/diccionario/*','https://ipapi.co/json/?key=6f614d73b8bc11a49e7fc2b1b6fba827c48767b8'],
        throwNoTokenError: true
      }

    })
  ],
  providers: [
    CurriculumHomeComponent, CurriculumVitaeComponent, PsicoComponent, DigitalBrandingComponent, CookieService, SchedulePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Token,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'es-CO' },
    AdvisoryComponent, AdvisoryIttComponent, SecurityComponent,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {
  }

}
