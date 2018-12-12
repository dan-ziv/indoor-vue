import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import Auth from "@okta/okta-vue";

Vue.use(Auth, {
  issuer: "https://dev-359718.oktapreview.com/oauth2/default",
  client_id: "0oai90ucorYebNYXH0h7",
  redirect_uri: "http://localhost:8080/implicit/callback",
  scope: "openid profile email"
});

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/implicit/callback",
      component: Auth.handleCallback()
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
