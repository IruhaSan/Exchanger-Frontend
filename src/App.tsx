import React, {
  lazy, Suspense, FC, useState,
} from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route } from 'react-router-dom';
import Layout from '@/utils/components/Layout';
import ROUTES from '@/const/routes';
import '@/assets/styles/index.scss';
import AccountLayout from './utils/components/AccountLayout';
import { ProtectedRoute } from './utils/components/ProtectedRoute';

const HomePage = lazy(() => import('@/pages/Home'));
const SignUpPage = lazy(() => import('@/pages/SignUp'));
const SignInPage = lazy(() => import('@/pages/SignIn'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));
const ContactsPage = lazy(() => import('@/pages/Contacts'));
const FAQPage = lazy(() => import('@/pages/FAQ'));
const ReviewsPage = lazy(() => import('@/pages/Reviews'));
const RulesPage = lazy(() => import('@/pages/Rules'));
const AccountPersonalSettingsPage = lazy(() => import('@/pages/AccountPersonalSettings'));
const AccountSecuritySettingsPage = lazy(() => import('@/pages/AccountSecuritySettings'));
const AccountOperationsPage = lazy(() => import('@/pages/AccountOperations'));
const ExchangePage = lazy(() => import('@/pages/ExchangeStep1'));

const App: FC = () => {
  const [authorizationToggle, setAuthorization] = useState(false);

  console.log('first');
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Helmet>
      <Layout
        authorizationToggle={authorizationToggle}
        setAuthorization={setAuthorization}
      >
        <Suspense fallback={(
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '50vh',
          }}
          >
            {/* <LoadingCircle isLoading size={64} /> */}
            LOADING
          </div>
      )}
        >
          <Switch>
            <Route
              path={ROUTES.HOME}
              exact
              render={() => (
                <HomePage
                  authorizationToggle={authorizationToggle}
                  setAuthorization={setAuthorization}
                />
              )}
            />
            <Route path={ROUTES.SIGN_IN} exact component={SignInPage} />
            <Route path={ROUTES.SIGN_UP} exact component={SignUpPage} />
            <Route path={ROUTES.NOT_FOUND} exact component={NotFoundPage} />
            <Route path={ROUTES.RULES} exact component={RulesPage} />
            <Route path={ROUTES.FAQ} exact component={FAQPage} />
            <Route path={ROUTES.REVIEWS} exact component={ReviewsPage} />
            <Route path={ROUTES.CONTACTS} exact component={ContactsPage} />
            <Route path={ROUTES.EXCHANGE_STEP} exact component={ExchangePage} />

            <AccountLayout>
              <Switch>
                <ProtectedRoute path={ROUTES.ACCOUNT_PERSONAL_AREA} exact component={AccountPersonalSettingsPage} />
                <ProtectedRoute path={ROUTES.ACCOUNT_SECURITY_SETTINGS} exact component={AccountSecuritySettingsPage} />
                <ProtectedRoute path={ROUTES.ACCOUNT_OPERATIONS} exact component={AccountOperationsPage} />
              </Switch>
            </AccountLayout>
          </Switch>
        </Suspense>
      </Layout>

    </>
  );
};

export default App;
