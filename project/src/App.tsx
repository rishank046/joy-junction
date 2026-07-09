import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import { RootLayout } from '@/components/layout/RootLayout';
import Home from '@/pages/home';
import Attractions from '@/pages/attractions';
import BirthdayEvents from '@/pages/birthday';
import Offers from '@/pages/offers';
import Gallery from '@/pages/gallery';
import About from '@/pages/about';
import Contact from '@/pages/contact';

const queryClient = new QueryClient();

function Router() {
  return (
    <RootLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/attractions" component={Attractions} />
        <Route path="/birthday" component={BirthdayEvents} />
        <Route path="/offers" component={Offers} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </RootLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
