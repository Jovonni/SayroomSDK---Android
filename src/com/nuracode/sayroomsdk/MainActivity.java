package com.nuracode.sayroomsdk;

//import java.io.DataInputStream;
//import java.io.DataOutputStream;
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.IOException;
//import java.net.HttpURLConnection;
//import java.net.MalformedURLException;
//import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.NameValuePair;
import org.json.JSONObject;

import com.nuracode.sayroom.R;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
//import android.media.MediaPlayer;
//import android.media.MediaRecorder;
import android.os.AsyncTask;
import android.os.Bundle;
//import android.os.Environment;
//import android.os.SystemClock;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.View.OnClickListener;
import android.webkit.JavascriptInterface;
//import android.webkit.WebChromeClient;
import android.webkit.WebView;
//import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.Toast;

	public class MainActivity extends Activity implements OnClickListener{
		
		
		SharedPreferences prefs;	
		//String api_key = "bi4WZa1TXqRv75sJXKMjLY6JarnFDwZpQ1WqodwLkSG2rdKmG8";
		static String api_key = "3r9gyBK3hurUQx82OwMSsjm4";
		
		
	
		private static final String LOG_TAG = "Main activity";
	    //private static String mFileName = null;
	    //private MediaRecorder mRecorder = null;
	    //private MediaPlayer   mPlayer = null;
		WebView _webView;
		String location = "Jaipur_India",userID = "";
		Button rec,stop;
		JSONParser jParser;
		JavaScriptInterface jInterface;
		
		@SuppressLint("NewApi")
		@Override
		protected void onCreate(Bundle savedInstanceState) {
			super.onCreate(savedInstanceState);
			this.requestWindowFeature(Window.FEATURE_NO_TITLE); // Removes title bar
			setContentView(R.layout.activity_main);
			jParser = new JSONParser(this);
			jInterface = new JavaScriptInterface(this);
			prefs = PreferenceManager.getDefaultSharedPreferences(this);
			_webView = (WebView) findViewById(R.id.webview);
			//rec = (Button) findViewById(R.id.bt_rec);
			//rec.setOnClickListener(this);
			//stop = (Button) findViewById(R.id.bt_stop);
			//stop.setOnClickListener(this);
			userID = prefs.getString("userId", "");
			_webView.getSettings().setJavaScriptEnabled(true);
			_webView.getSettings().setAllowUniversalAccessFromFileURLs(true);
					
			///////
			
			Toast.makeText(getApplicationContext(), "Here",
					   Toast.LENGTH_LONG).show();
			
			/////////
	
			Intent i = getIntent();
			
			if(i.hasExtra("isNewUser")){
				boolean isNewUser = i.hasExtra("isNewUser");
				if(isNewUser){
					_webView.loadUrl("file:///android_asset/www/index.html#/say/tutorial");				
				}
			}else{
				_webView.loadUrl("file:///android_asset/www/index.html#/say");
				//webView.loadUrl("file:///android_asset/www/partials/home.html");
				
				//webView.loadUrl("file:///android_asset/www/test.html");
				//file:///android_asset/www/partials/home.html
			}
			
			_webView.addJavascriptInterface(new JavaScriptInterface(this), "jsInterface");	
			
			//convert for sdk param
			int uid = Integer.parseInt(userID);
			
			//set credentials & INITIATE
			SayroomSDK.setCredentials(uid,api_key);
			
	
	}
	
	
	
	 public class JavaScriptInterface {
	        Context mContext;
	 

	        JavaScriptInterface(Context c) {
	            mContext = c;
	        }
	 
	        /** Show a toast from the web page */
	        @JavascriptInterface
	        public String showToast(String toast) {
	            Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
	            return toast;
	        }
	        
	        @JavascriptInterface
	        public int makeItDoubleByJava(int val){
	            return val*2;
	        }
	        
	        //SDK ENDPOINT1
	        public boolean recordAudio(){
//	        	mFileName = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MUSIC).getAbsolutePath()+"/"+Calendar.getInstance().getTimeInMillis()+".amr";
	        	//reg android
	        	//mFileName = Environment.getExternalStorageDirectory().getAbsolutePath()+"/"+Calendar.getInstance().getTimeInMillis()+".amr";
	        	//kindle
	        	//mFileName = Environment.getExternalStorageDirectory().getAbsolutePath()+"/"+Calendar.getInstance().getTimeInMillis()+".acc";
	        	//startRecording();
	        	
	        	
	    		return SayroomSDK.recordAudio();
	        }
	        
	        //SDK ENDPOINT 2
	        public boolean stopRecordingOnImage(String brandImageID){
	        	
	        	if(!SayroomSDK.verifiedStatus){
	        		return false;
	        	}else{
	        		return SayroomSDK.stopRecordingOnImage(Integer.parseInt(brandImageID));
	        	}
	        	
	        }
	        
	        //SDK ENDPOINT 3
	        public boolean stopRecordingOnTask(String taskImageID){
	        	
	        	if(!SayroomSDK.verifiedStatus){
	        		return false;
	        	}else{
	        		return SayroomSDK.stopRecordingOnTask(Integer.parseInt(taskImageID));
	        	}
	        	
	        }
	        
	        public void playCurrentRecording(){
	        	SayroomSDK.playCurrentAudioRecording();
	        }
	        
	        
	}
	 
	    /*
	 	private void startPlaying() {
	        mPlayer = new MediaPlayer();
	        try {
	            mPlayer.setDataSource(mFileName);
	            mPlayer.prepare();
	            mPlayer.start();
	        } catch (IOException e) {
	            Log.e(LOG_TAG, "prepare() failed");
	        }
	    }

	    private void stopPlaying() {
	        mPlayer.release();
	        mPlayer = null;
	    }

	    private void startRecording() {
	        mRecorder = new MediaRecorder();
	        mRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
	        
	        //non kindle
	        mRecorder.setOutputFormat(MediaRecorder.OutputFormat.AMR_NB);
	        //mRecorder.setOutputFormat(MediaRecorder.OutputFormat.AAC_ADTS);
	        
	        //non kindle
	        mRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);
	        //mRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AAC);
	        
	        mRecorder.setOutputFile(mFileName);

	        try {
	            mRecorder.prepare();
	        } catch (IOException e) {
	            Log.e(LOG_TAG, "prepare() failed");
	        }

	        mRecorder.start();
	    }

	    private void stopRecording() {
	        mRecorder.stop();
	        mRecorder.release();
	        mRecorder = null;
	    }*/
	    /*
	    class UploadAudioForImage extends AsyncTask<String, String, String>{

	    	String userID,brandImageID,userCurrentLocation,fileName;
	    	ProgressDialog pDialog;
	    	JSONObject json;
	    	
	    	public UploadAudioForImage(String userID,String brandImageID,String userCurrentLocation,String fileName) {
				this.userID = userID;
				this.brandImageID = brandImageID;
				this.userCurrentLocation = userCurrentLocation;
				this.fileName = fileName;
			}
	    	
	    	
	    	@Override
	    	protected void onPreExecute() {
	    		pDialog = ProgressDialog.show(MainActivity.this, "Uploading Audio", "Please wait..");
	    		super.onPreExecute();
	    	}

	    	
	    	@Override
			protected String doInBackground(String... agrs) {
	    		
	    		
	    		String urlString = url_upload_audio_images+"/"+userID+"/"+brandImageID+"/"+userCurrentLocation+"?api_key="+api_key;	    			    		
	    		HttpURLConnection conn = null;
	    		DataOutputStream dos = null;
	    		DataInputStream inStream = null;
	    		// String existingFileName =
	    		// Environment.getExternalStorageDirectory().getAbsolutePath() +
	    		// "/pic.jpg";
	    		// String existingFileName = getPathToBackupFile();
	    		String lineEnd = "\r\n";
	    		String twoHyphens = "--";
	    		String boundary = "*****";
	    		int bytesRead, bytesAvailable, bufferSize;
	    		byte[] buffer;
	    		int maxBufferSize = 1 * 1024 * 1024;
	    		String responseFromServer = "";
	    		
	    		try {
	    			// ------------------ CLIENT REQUEST
	    			FileInputStream fileInputStream = new FileInputStream(fileName);
	    			// open a URL connection to the Servlet
	    			URL url = new URL(urlString);
	    			// Open a HTTP connection to the URL
	    			conn = (HttpURLConnection) url.openConnection();
	    			// Allow Inputs
	    			conn.setDoInput(true);
	    			// Allow Outputs
	    			conn.setDoOutput(true);
	    			// Don't use a cached copy.
	    			conn.setUseCaches(false);
	    			// Use a post method.
	    			conn.setRequestMethod("POST");
	    			conn.setRequestProperty("Connection", "Keep-Alive");	    			
	    			conn.setRequestProperty("Content-Type",
	    					"multipart/form-data;boundary=" + boundary);
	    			dos = new DataOutputStream(conn.getOutputStream());
	    			dos.writeBytes(twoHyphens + boundary + lineEnd);
	    			dos.writeBytes("Content-Disposition: form-data; name=\"file_contents\";filename=\""
	    					+ fileName + "\"" + lineEnd);
	    			dos.writeBytes(lineEnd);
	    			// create a buffer of maximum size
	    			bytesAvailable = fileInputStream.available();
	    			bufferSize = Math.min(bytesAvailable, maxBufferSize);
	    			buffer = new byte[bufferSize];
	    			// read file and write it into form...
	    			bytesRead = fileInputStream.read(buffer, 0, bufferSize);
	    			while (bytesRead > 0) {
	    				dos.write(buffer, 0, bufferSize);
	    				bytesAvailable = fileInputStream.available();
	    				bufferSize = Math.min(bytesAvailable, maxBufferSize);
	    				bytesRead = fileInputStream.read(buffer, 0, bufferSize);
	    			}
	    			// send multipart form data necessary after file data...
	    			dos.writeBytes(lineEnd);
	    			dos.writeBytes(twoHyphens + boundary + twoHyphens + lineEnd);
	    			// close streams
	    			Log.e("Debug", "File is written");
	    			fileInputStream.close();
	    			dos.flush();
	    			dos.close();
	    		} catch (MalformedURLException ex) {
	    			Log.e("Debug", "error: " + ex.getMessage(), ex);
	    		} catch (IOException ioe) {
	    			Log.e("Debug", "error: " + ioe.getMessage(), ioe);
	    		} finally {
	    			new File(fileName).delete();
	    		}
	    		// ------------------ read the SERVER RESPONSE
	    		try {
	    			inStream = new DataInputStream(conn.getInputStream());
	    			String str;

	    			while ((str = inStream.readLine()) != null) {
	    				Log.e("Debug", "Server Response " + str);
	    			}
	    			inStream.close();

	    		} catch (IOException ioex) {
	    			Log.e("Debug", "error: " + ioex.getMessage(), ioex);
	    		} catch (Exception e) {
	    			e.printStackTrace();
				}
	    		
	    		
				return null;
			}
	    	
	    	private List<NameValuePair> getParams(String fileName){
	    		List<NameValuePair> params = new ArrayList<NameValuePair>();
	    		
	    		return params;
	    	}
	    	
	    	@Override
	    	protected void onPostExecute(String result) {
	    		if(pDialog!=null && pDialog.isShowing()){
	    			pDialog.dismiss();
	    		}
	    		super.onPostExecute(result);
	    	}
	    	
	    }
	    */
	    /*
	    class UploadAudioForTask extends AsyncTask<String, String, String>{

	    	String userID,brandTaskID,userCurrentLocation,fileName;
	    	ProgressDialog pDialog;
	    	JSONObject json;
	    	
	    	public UploadAudioForTask(String userID,String brandTaskID,String userCurrentLocation,String fileName) {
				this.userID = userID;
				this.brandTaskID = brandTaskID;
				this.userCurrentLocation = userCurrentLocation;				
				this.fileName = fileName;
			}
	    	
	    	
	    	@Override
	    	protected void onPreExecute() {
	    		pDialog = ProgressDialog.show(MainActivity.this, "Uploading Audio", "Please wait..");
	    		super.onPreExecute();
	    	}

	  
	    	
	    	@Override
			protected String doInBackground(String... agrs) {
	    		
	    		List<NameValuePair> params = new ArrayList<NameValuePair>();
	    		String urlString = url_upload_audio_tasks+"/"+userID+"/"+brandTaskID+"/"+userCurrentLocation+"?api_key="+api_key;
	    		
	    		HttpURLConnection conn = null;
	    		DataOutputStream dos = null;
	    		DataInputStream inStream = null;
	    		// String existingFileName =
	    		// Environment.getExternalStorageDirectory().getAbsolutePath() +
	    		// "/pic.jpg";
	    		// String existingFileName = getPathToBackupFile();
	    		String lineEnd = "\r\n";
	    		String twoHyphens = "--";
	    		String boundary = "*****";
	    		int bytesRead, bytesAvailable, bufferSize;
	    		byte[] buffer;
	    		int maxBufferSize = 1 * 1024 * 1024;
	    		String responseFromServer = "";
	    		
	    		try {
	    			// ------------------ CLIENT REQUEST
	    			FileInputStream fileInputStream = new FileInputStream(fileName);
	    			// open a URL connection to the Servlet
	    			URL url = new URL(urlString);
	    			// Open a HTTP connection to the URL
	    			conn = (HttpURLConnection) url.openConnection();
	    			// Allow Inputs
	    			conn.setDoInput(true);
	    			// Allow Outputs
	    			conn.setDoOutput(true);
	    			// Don't use a cached copy.
	    			conn.setUseCaches(false);
	    			// Use a post method.
	    			conn.setRequestMethod("POST");
	    			conn.setRequestProperty("Connection", "Keep-Alive");	    			
	    			conn.setRequestProperty("Content-Type",
	    					"multipart/form-data;boundary=" + boundary);
	    			dos = new DataOutputStream(conn.getOutputStream());
	    			dos.writeBytes(twoHyphens + boundary + lineEnd);
	    			dos.writeBytes("Content-Disposition: form-data; name=\"file_contents\";filename=\""
	    					+ fileName + "\"" + lineEnd);
	    			dos.writeBytes(lineEnd);
	    			// create a buffer of maximum size
	    			bytesAvailable = fileInputStream.available();
	    			bufferSize = Math.min(bytesAvailable, maxBufferSize);
	    			buffer = new byte[bufferSize];
	    			// read file and write it into form...
	    			bytesRead = fileInputStream.read(buffer, 0, bufferSize);
	    			while (bytesRead > 0) {
	    				dos.write(buffer, 0, bufferSize);
	    				bytesAvailable = fileInputStream.available();
	    				bufferSize = Math.min(bytesAvailable, maxBufferSize);
	    				bytesRead = fileInputStream.read(buffer, 0, bufferSize);
	    			}
	    			// send multipart form data necessary after file data...
	    			dos.writeBytes(lineEnd);
	    			dos.writeBytes(twoHyphens + boundary + twoHyphens + lineEnd);
	    			// close streams
	    			Log.e("Debug", "File is written");
	    			fileInputStream.close();
	    			dos.flush();
	    			dos.close();
	    		} catch (MalformedURLException ex) {
	    			Log.e("Debug", "error: " + ex.getMessage(), ex);
	    		} catch (IOException ioe) {
	    			Log.e("Debug", "error: " + ioe.getMessage(), ioe);
	    		} finally {
	    			new File(fileName).delete();
	    		}
	    		// ------------------ read the SERVER RESPONSE
	    		try {
	    			inStream = new DataInputStream(conn.getInputStream());
	    			String str;

	    			while ((str = inStream.readLine()) != null) {
	    				Log.e("Debug", "Server Response " + str);
	    			}
	    			inStream.close();

	    		} catch (IOException ioex) {
	    			Log.e("Debug", "error: " + ioex.getMessage(), ioex);
	    		} catch (Exception e) {
	    			e.printStackTrace();
				}
	    		
	    		
	    		
	    		
				return null;
			}
	    	
	    	@Override
	    	protected void onPostExecute(String result) {
	    		if(pDialog!=null && pDialog.isShowing()){
	    			pDialog.dismiss();
	    		}
	    		super.onPostExecute(result);
	    	}
	    	
	    }*/
	    
	    
	    class VerifyUser extends AsyncTask<String, String, String>{

	    	JSONObject json;
	    	ProgressDialog pDialog;
	    	
	    	@Override
	    	protected void onPreExecute() {
	    		pDialog =ProgressDialog.show(MainActivity.this, "Verifing", "Please wait..");
	    		super.onPreExecute();
	    	}
	    	
			@Override
			protected String doInBackground(String... args) {
				List<NameValuePair> params = new ArrayList<NameValuePair>();
				
//	    		String url = url_verify_user+"/"+userID+"/"+brandImageID+"/"+userCurrentLocation+"?api_key="+api_key;
//	    		json = jParser.makeHttpRequest(url, "GET", params);
				
	    		Log.d("Upload Audio:", json+"");
	    		
	    		if(json == null)
	    			return null;
	    		
				return null;
			}
			
			@Override
			
			protected void onPostExecute(String result) {
				if(pDialog != null && pDialog.isShowing()){
					pDialog.dismiss();
				}
				super.onPostExecute(result);
			}
	    	
	    }


		@Override
		public void onClick(View v) {
			// TODO Auto-generated method stub
			//all onclicks
			/*
			switch (v.getId()) {
			case R.id.bt_rec:
				Log.d("MainActivity", "rec button clicked");
				jInterface.recordAudio();
				break;
			case R.id.bt_stop:
				Log.d("MainActivity", "stop button clicked");
				//jInterface.stopRecordingOnImage("1", userID, api_key);
				jInterface.stopRecordingOnTask("1", userID, api_key);
				break;
			default:
				break;
			}
			
			
			*/
			
			
			
			/*if(v.getId() == R.id.bt_rec){
				
				Log.d("MainActivity", "rec button clicked");
				jInterface.recordAudio();
				
			}else if(v.getId() == R.id.bt_stop){
				
				Log.d("MainActivity", "stop button clicked");
				//jInterface.stopRecordingOnImage("1", userID, api_key);
				//jInterface.stopRecordingOnTask("1", userID, api_key);
				jInterface.stopRecordingOnTask("1");
				
			}*/
			
			
			
		}
	    
	/*@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		// Handle action bar item clicks here. The action bar will
		// automatically handle clicks on the Home/Up button, so long
		// as you specify a parent activity in AndroidManifest.xml.
		int id = item.getItemId();
		if (id == R.id.action_settings) {
			return true;
		}
		return super.onOptionsItemSelected(item);
	}*/
	 

}
