package com.nuracode.sayroomsdk;


import com.nuracode.sayroom.R;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.Window;
import android.view.WindowManager;

public class SplashActivity extends Activity {
	
	public static final int SLEEP_TIME = 4;
	IntentLauncher launcher;
	SharedPreferences sharedPrefs;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		this.requestWindowFeature(Window.FEATURE_NO_TITLE); // Removes title bar
//		this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
//				WindowManager.LayoutParams.FLAG_FULLSCREEN);
		setContentView(R.layout.activity_splash);
		sharedPrefs = PreferenceManager
				.getDefaultSharedPreferences(SplashActivity.this);

		
		
		launcher = new IntentLauncher();
		launcher.start();

	}
	
	private class IntentLauncher extends Thread {
		@Override
		/**
		 * Sleep for some time and than start new activity.
		 */
		public void run() {
			try {
				// Sleeping
				Thread.sleep(SLEEP_TIME * 4);
				if(sharedPrefs.getString("userId", "").equals("")){
					//
					Intent intent = new Intent(SplashActivity.this, RegisterActivity.class);
					startActivity(intent);
			
				}else{
					//
					Intent intent = new Intent(SplashActivity.this, MainActivity.class);
					startActivity(intent);
					
				}
				
				finish();
				
				/*
				 * overridePendingTransition(R.anim.grow_from_middle,
				 * R.anim.shrink_to_middle);
				 */

			} catch (Exception e) {
				Log.e("error_msg", e.getMessage());
			}

		}
	}

}
