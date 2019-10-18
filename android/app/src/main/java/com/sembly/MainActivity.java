package com.sembly;

import android.os.Bundle;
import android.os.Handler;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import org.devio.rn.splashscreen.SplashScreen;  
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;


public class MainActivity extends ReactActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                SplashScreen.hide(MainActivity.this);
            }
        },2000);
        // here
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "sembly";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }
}
