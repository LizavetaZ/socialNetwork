import React, {ComponentType} from 'react';
import {Preloader} from "components/common/Preloader/Preloader";
import {Route} from "react-router-dom";

export function withSuspense<T>(Component: ComponentType<T>) {
    return (props: T) => {
        return (
            <React.Suspense fallback={<Preloader />}>
                <Component {...props} />
            </React.Suspense>
        );
    };
}




