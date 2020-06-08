import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegisterComponent } from "./components/login-register/login-register.component";
import { CurriculumVitaeComponent } from "./components/curriculum-vitae/curriculum-vitae.component";
import { AdvisoryComponent } from "./components/advisory/advisory.component";
import { AdvisoryServiceComponent } from "./components/advisory/advisory-service/advisory-service.component";
import { EntreviewComponent } from "./components/entreview/entreview.component";
import { JobOffersComponent } from "./components/job-offers/job-offers.component";
import { JobOffersServiceComponent } from './components/job-offers/job-offers-service/job-offers-service.component';
import { SalaryComponent } from "./components/salary/salary.component";
import { SalaryServiceComponent } from './components/salary/salary-service/salary-service.component';
import { SalaryResultadoComponent } from './components/salary/salary-resultado/salary-resultado.component';
import { StudyComponent } from "./components/study/study.component";
import { HomeComponent } from "./components/home/home.component";
import { PsicoComponent } from './components/psico/psico.component';
import { PsicoSchedulingComponent } from './components/psico/psico-scheduling/psico-scheduling.component';
import { PsicoTestsComponent } from './components/psico/psico-tests/psico-tests.component';
import { ProfileComponent } from "./components/profile/profile.component";
import { HelpComponent } from "./components/help/help.component";
import { SchedulingComponent } from "./components/scheduling/scheduling.component";
import { CurriculumHomeComponent } from "./components/curriculum-home/curriculum-home.component";
import { CurriculumSchedulingComponent} from "./components/curriculum-scheduling/curriculum-scheduling.component";
import { BlockLoaderComponent } from "./components/block-loader/block-loader.component";

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DigitalBrandingComponent } from './components/digital-branding/digital-branding.component';
import { DigitalBrandingServiceComponent } from './components/digital-branding/digital-branding-service/digital-branding-service.component';
import { DigitalBrandingFormComponent } from './components/digital-branding/digital-branding-form/digital-branding-form.component';
import { DigitalBrandingSchedulingComponent } from './components/digital-branding/digital-branding-scheduling/digital-branding-scheduling.component';
import { NetworkingComponent } from './components/networking/networking.component';
import { NetworkingServiceComponent } from './components/networking/networking-service/networking-service.component';
import { NetworkingEventsComponent } from './components/networking/networking-events/networking-events.component';
import { NetworkingEventDetailComponent } from './components/networking/networking-event-detail/networking-event-detail.component';
import { NetworkingCommunityComponent } from './components/networking/networking-community/networking-community.component';
import { NetworkingSchedulingComponent } from './components/networking/networking-scheduling/networking-scheduling.component';
import { CoworkingComponent } from "./components/coworking/coworking.component";
import { CoworkingServiceComponent } from './components/coworking/coworking-service/coworking-service.component';
import { CoworkingformComponent } from './components/coworking/coworkingform/coworkingform.component';
import { CoworkingSchedulingComponent } from './components/coworking/coworking-scheduling/coworking-scheduling.component';
import { SecurityComponent } from "./components/security/security.component";
import { SecurityServiceComponent } from "./components/security/security-service/security-service.component";
import { SecuritySchedulingComponent } from "./components/security/security-scheduling/security-scheduling.component";
import { AdvisoryIttComponent } from "./components/advisory-itt/advisory-itt.component";
import { AdvisoryIttServiceComponent } from './components/advisory-itt/advisory-itt-service/advisory-itt-service.component';
import { FaqComponent } from './components/faq/faq.component';
import { ScoreCreditComponent } from './components/score-credit/score-credit.component';
import { ServiceScoreCreditComponent } from './components/score-credit/service-score-credit/service-score-credit.component';
import { ScoreCreditEjercicioComponent } from './components/score-credit/score-credit-ejercicio/score-credit-ejercicio.component';
import { ScoreCreditResultadoComponent } from './components/score-credit/score-credit-resultado/score-credit-resultado.component';
import { AlertNotificationsComponent } from './components/alert-notifications/alert-notifications.component';
import { AlertNotificationsServiceComponent } from './components/alert-notifications/alert-notifications-service/alert-notifications-service.component';
import { AlertNotificationsActiveComponent } from './components/alert-notifications/alert-notifications-active/alert-notifications-active.component';
import { AlertNotificationsConfirmComponent } from './components/alert-notifications/alert-notifications-confirm/alert-notifications-confirm.component';
import { EconomyStudyExerciceComponent } from './components/economy-study/economy-study-exercice/economy-study-exercice.component';
import { EconomyStudyComponent } from './components/economy-study/economy-study.component';
import { EconomyStudyServiceComponent } from './components/economy-study/economy-study-service/economy-study-service.component';
import { EconomyStudyCourseComponent } from './components/economy-study/economy-study-exercice/economy-study-course/economy-study-course.component';
import { EconomyStudyCourse1Component } from './components/economy-study/economy-study-exercice/economy-study-course1/economy-study-course1.component';
import { EconomyStudyCourse2Component } from './components/economy-study/economy-study-exercice/economy-study-course2/economy-study-course2.component';
import { FinancialHealthComponent } from './components/financial-health/financial-health.component';
import { FinancialHealthExercicesComponent } from './components/financial-health/financial-health-exercices/financial-health-exercices.component';
import { FinancialHealtServiceComponent } from './components/financial-health/financial-healt-service/financial-healt-service.component';
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
import { PdfComponent } from "./components/pdf/pdf.component";
import { StudyIttComponent } from './components/study-itt/study-itt.component';
import { AdminComponent } from "./components/admin/admin.component";
import { AdminNetworkingComponent } from "./components/admin/admin-networking/admin-networking.component";
import { from } from 'rxjs';
import { Component } from '@fullcalendar/core';

const routes: Routes = [
  {
    path: 'inicio', component: HomeComponent
  },
  { path: 'desempleo', component: HomeComponent },
  { path: 'itt', component: HomeComponent },
  { path: 'fraude', component: HomeComponent },
  {
    path: 'inicia-sesion/:id', component: LoginRegisterComponent
  },
  {
    path: 'registro/:id', component: LoginRegisterComponent
  },
  {
    path: 'mejorar-hoja-de-vida', component: CurriculumVitaeComponent
  },
  { path: 'mejorar-hoja-de-vida-agenda', component: CurriculumSchedulingComponent },
  {
    path: 'estudiar-coursera', component: StudyComponent
  },
  {
    path: 'estudiar-coursera-itt', component: StudyIttComponent
  },
  {
    path: 'asesoria-legal', component: AdvisoryComponent
  },
  { path: 'asesoria-legal-servicio', component: AdvisoryServiceComponent },
  {
    path: 'preparar-entrevistas', component: EntreviewComponent
  },
  {
    path: 'ofertas-laborales', component: JobOffersComponent
  },
  {
    path: 'ofertas-laborales-servicio', component: JobOffersServiceComponent
  },
  {
    path: 'comparar-salario', component: SalaryComponent
  },
  {
    path: 'comparar-salario-servicio', component: SalaryServiceComponent
  },
  {
    path: 'comparar-salario-resultado', component: SalaryResultadoComponent
  },
  {
    path: 'perfil', component: ProfileComponent
  },
  {
    path: 'ayuda', component: HelpComponent
  },
  { path: 'prueba-psicologica', component: PsicoComponent },
  { path: 'prueba-psicologica-agenda', component: PsicoSchedulingComponent },
  { path: 'prueba-psicologica-ejercicio', component: PsicoTestsComponent },
  { path: 'agenda', component: SchedulingComponent },
  { path: 'agenda-asesoria-legal', component: SchedulingComponent },
  {
    path: 'mejorar-hoja-de-vida-inicio', component: CurriculumHomeComponent
  },
  {
    path: 'mejorar-hoja-de-vida-inicio/:id', component: CurriculumHomeComponent
  },
  {
    path: 'block', component: BlockLoaderComponent
  },
  { path: 'branding-digital', component: DigitalBrandingComponent },
  { path: 'branding-digital-servicio', component: DigitalBrandingServiceComponent },
  { path: 'branding-digital-formulario', component: DigitalBrandingFormComponent },
  { path: 'branding-digital-agenda', component: DigitalBrandingSchedulingComponent },
  { path: 'networking', component: NetworkingComponent },
  { path: 'networking-servicio', component: NetworkingServiceComponent },
  { path: 'networking-eventos', component: NetworkingEventsComponent },
  { path: 'networking-detalle-evento', component: NetworkingEventDetailComponent },
  { path: 'networking-comunidad', component: NetworkingCommunityComponent },
  { path: 'networking-agenda', component: NetworkingSchedulingComponent },
  { path: 'coworking', component: CoworkingComponent },
  { path: 'coworking-servicio', component: CoworkingServiceComponent },
  { path: 'coworking-formulario', component: CoworkingformComponent },
  { path: 'coworking-agenda', component: CoworkingSchedulingComponent },
  { path: 'seguridad-informatica', component: SecurityComponent },
  { path: 'seguridad-informatica-servicio', component: SecurityServiceComponent },
  { path: 'seguridad-informatica-agenda', component: SecuritySchedulingComponent },
  { path: 'asesoria-legal-itt', component: AdvisoryIttComponent },
  { path: 'asesoria-legal-itt-servicio', component: AdvisoryIttServiceComponent },
  {
    path: 'preguntas-frecuentes', component: FaqComponent
  },
  { path: 'score-credito', component: ScoreCreditComponent },
  { path: 'servicio-score-credito', component: ServiceScoreCreditComponent },
  { path: 'score-credito-ejercicio', component: ScoreCreditEjercicioComponent },
  { path: 'score-credito-resultado', component: ScoreCreditResultadoComponent },
  { path: 'alertas-notificaciones', component: AlertNotificationsComponent },
  { path: 'alertas-notificaciones-servicio', component: AlertNotificationsServiceComponent },
  { path: 'alertas-notificaciones-activar', component: AlertNotificationsActiveComponent },
  { path: 'alertas-notificaciones-confirmado', component: AlertNotificationsConfirmComponent },
  { path: 'estudia-economia', component: EconomyStudyComponent },
  { path: 'estudia-economia-servicio', component: EconomyStudyServiceComponent },
  { path: 'estudia-economia-ejercicio', component: EconomyStudyExerciceComponent },
  { path: 'estudia-economia-curso', component: EconomyStudyCourseComponent },
  { path: 'estudia-economia-curso1', component: EconomyStudyCourse1Component },
  { path: 'estudia-economia-curso2', component: EconomyStudyCourse2Component },
  { path: 'salud-financiera', component: FinancialHealthComponent },
  { path: 'salud-financiera-servicio', component: FinancialHealtServiceComponent },
  { path: 'salud-financiera-ejercicios', component: FinancialHealthExercicesComponent },
  { path: 'salud-financiera-ejercicio1', component: FinancialHealthExcercice1Component },
  { path: 'salud-financiera-ejercicio2', component: FinancialHealthExcercice2Component },
  { path: 'salud-financiera-ejercicio3', component: FinancialHealthExcercice3Component },
  { path: 'salud-financiera-ejercicio4', component: FinancialHealthExcercice4Component },
  { path: 'salud-financiera-ejercicio5', component: FinancialHealthExcercice5Component },
  { path: 'salud-financiera-ejercicio6', component: FinancialHealthExcercice6Component },
  { path: 'salud-financiera-ejercicio7', component: FinancialHealthExcercice7Component },
  { path: 'salud-financiera-ejercicio8', component: FinancialHealthExcercice8Component },
  { path: 'salud-financiera-ejercicio9', component: FinancialHealthExcercice9Component },
  { path: 'salud-financiera-ejercicio10', component: FinancialHealthExcercice10Component },
  {
    path: 'pdf', component: PdfComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
