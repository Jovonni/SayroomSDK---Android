package com.nuracode.sayroomsdk;

import java.io.IOException;
import java.util.Calendar;

import android.media.MediaPlayer;
import android.media.MediaRecorder;
import android.os.Environment;
import android.util.Log;

public class SayroomRecorder {

	public static boolean recorderStatus;
    private static String mFileName = null;
    private static MediaRecorder mRecorder = null;    
    private MediaPlayer mPlayer = null;
    private static final String LOG_TAG = "Sayroom Recorder";
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
	
	public static String getFileName(){
		return mFileName;
	}
	
	public static boolean recordAudio(){
		
		Log.d(LOG_TAG, "Recording Audio");
		
		//regular android
    	mFileName = Environment.getExternalStorageDirectory().getAbsolutePath()+"/"+Calendar.getInstance().getTimeInMillis()+".acc";

		
		if(mRecorder != null){
			stopRecording();
		}
		
		
		//call SRAudioRecorder
		
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
		
		
		return true;		
	}
	
	public static boolean stopRecording(){
		mRecorder.stop();
        mRecorder.release();
        mRecorder = null;
        return true;
	}
	
	

}
