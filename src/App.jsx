import { RouterProvider } from 'react-router-dom';

// routing
import router from 'routes';

// project imports
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import Snackbar from 'ui-component/extended/Snackbar';
import Notistack from 'ui-component/third-party/Notistack';

import ThemeCustomization from 'themes';

// auth provider
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
import { CAREProvider as QuestionProvider } from 'contexts/CAREContext';

// ==============================|| APP ||============================== //

const App = () => {
    return (
        <ThemeCustomization>
            <Locales>
                <NavigationScroll>
                    <AuthProvider>
                        <QuestionProvider>
                        <>
                            <Notistack>
                                <RouterProvider router={router} />
                                <Snackbar />
                            </Notistack>
                        </>
                        </QuestionProvider>
                    </AuthProvider>
                </NavigationScroll>
            </Locales>
        </ThemeCustomization>
    );
};

export default App;
