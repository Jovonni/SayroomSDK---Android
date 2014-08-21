package com.nuracode.sayroomsdk;

import java.io.IOException;
import java.util.Calendar;

import android.content.Context;
import android.media.MediaPlayer;
import android.media.MediaRecorder;
import android.os.Environment;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.Toast;

//import com.vardhaman.barebones.MainActivity.JavaScriptInterface;

import com.nuracode.sayroomsdk.SRImageAudioUpload;
import com.nuracode.sayroomsdk.SRTaskAudioUpload;


public class JavaScriptInterface {
    Context mContext;
    private static final String LOG_TAG = "AudioRecordTest";
    private static String mFileName = null;
    private MediaRecorder mRecorder = null;
    private MediaPlayer   mPlayer = null;
	WebView _webView;
	String location = "Jaipur_India",userID = "";
	Button rec,stop;
	JSONParser jParser;
	JavaScriptInterface jInterface;
    
    public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

    /** Instantiate the interface and set the context */
    
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
    
            
    public void recordAudio(){
//    	mFileName = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MUSIC).getAbsolutePath()+"/"+Calendar.getInstance().getTimeInMillis()+".amr";
    	//reg android
    	//mFileName = Environment.getExternalStorageDirectory().getAbsolutePath()+"/"+Calendar.getInstance().getTimeInMillis()+".amr";
    	//kindle
    	mFileName = Environment.getExternalStorageDirectory().getAbsolutePath()+"/"+Calendar.getInstance().getTimeInMillis()+".acc";
    	startRecording();
    }
    
    public void stopRecordingOnImage(String brandImageID, String ReactorMemberID, String APIKey){
    	stopRecording();
    	verificationAPI(ReactorMemberID, APIKey);
    	userUploadAudioForImage(userID, brandImageID, location);	        	
    }
    
    public void stopRecordingOnTask(String taskImageID, String ReactorMemberID, String APIKey){
    	stopRecording();
    	verificationAPI(ReactorMemberID, APIKey);
    	userUploadAudioForTask(userID, taskImageID, location);
    }
    
    public void verificationAPI(String ReactorMemberID, String APIKey){
    	//new VerifyUser().execute();
    }
    
    public void userUploadAudioForImage(String userID,String brandImageID,String userCurrentLocation){
    	new SRImageAudioUpload(userID, brandImageID, userCurrentLocation,mFileName).execute();
    }
    
    public void userUploadAudioForTask(String userID,String brandTaskID,String userCurrentLocation){
    	new SRTaskAudioUpload(userID, brandTaskID, userCurrentLocation,mFileName).execute();
    }
    
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
    }
    
}


