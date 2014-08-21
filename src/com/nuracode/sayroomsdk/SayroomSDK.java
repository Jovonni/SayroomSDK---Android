package com.nuracode.sayroomsdk;

//import android.content.SharedPreferences;
//import android.media.MediaPlayer;
//import android.media.MediaRecorder;
//import android.os.Bundle;
//import android.os.Environment;
import android.util.Log;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.net.URL;

import org.apache.http.NameValuePair;
import org.json.JSONObject;

import com.nuracode.sayroomsdk.SRImageAudioUpload;

public class SayroomSDK {

	private static int reactorMemberID;
	private static String APIKey;
	private static String userLocation = "loc";
	public static boolean verifiedStatus;
	
	private static JSONParser jParser;
	private static JSONObject json;
	
	//needed resources
	private static final String LOG_TAG = "SayroomSDKMain";
	
	private static String url_verify_user = "http://api.sayroom.com/v1/sayroomModel/userCheckAPIKey";
	
	//String api_key = "bi4WZa1TXqRv75sJXKMjLY6JarnFDwZpQ1WqodwLkSG2rdKmG8";
	static String api_key = "3r9gyBK3hurUQx82OwMSsjm4";
	
	public SayroomSDK(){
		
	}
	
	public static String retreiveApiKey(){
		String apik = api_key;
		return apik;
	}
	
	public static boolean setCredentials(int rmid, String api){
		reactorMemberID = rmid;
		APIKey = api;
						
		Log.d(LOG_TAG, "Initiated, and set credentials");
		
		return verifyUserAPIKey();
		
	}
	
	private static boolean verifyUserAPIKey(){
		
		///call SRServerCalls verify user
		
		//url: url_verify_user
		
		
		String url = SayroomSDK.url_verify_user+"?api_key="+APIKey+"&rmid="+reactorMemberID;
		
		
		
		
		
		Log.d(LOG_TAG, "Verifying user api key");
		
		verifiedStatus = true;
		
		return true;
	}
	
	
	public static boolean stopRecordingOnImage(int iid){	
		
		Log.d(LOG_TAG, "Stopped recording on image");
		
		if(SayroomRecorder.stopRecording()){
			//new UploadAudioForImage(String userID, String brandTaskID, String userCurrentLocation,String fileName) 
			
			//if no verified status
			if(!verifiedStatus){
				return false;
			}else{
				new SRImageAudioUpload(String.valueOf(reactorMemberID), String.valueOf(iid), userLocation, SayroomRecorder.getFileName());
				return true;
			}
			
		}else{
			return false;
		}
		
		
	}
	
	public static boolean stopRecordingOnTask(int tid){	
		
		Log.d(LOG_TAG, "Stopped recording on task");
		
		if(SayroomRecorder.stopRecording()){
			//new UploadAudioForTask(String userID, String brandTaskID, String userCurrentLocation,String fileName) 
			
			
			//if no verified status
			if(!verifiedStatus){
				return false;
			}else{
				new SRTaskAudioUpload(String.valueOf(reactorMemberID), String.valueOf(tid), userLocation, SayroomRecorder.getFileName());
				return true;
			}
			
			
		}else{
			return false;
		}
		
	}
	
	//util
	
	public static boolean recordAudio(){
		Log.d(LOG_TAG, "recording audio");
		return SayroomRecorder.recordAudio();
	}
	
	
	
	public static void playCurrentAudioRecording(){
		Log.d(LOG_TAG, "Playing current audio");
	}
	
	public boolean isVerified(){
		return verifiedStatus;
	}
	
	
	///////////// originals
	/*
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		//data field
		reactorMemberID = Integer.parseInt(args[0]);
		APIKey = args[1];
		
		System.out.println("Sayroom SDK Initiated");
		
		String LOG_TAG = "SDK Init";
		
		Log.d(LOG_TAG, "Initiated");
		
		
	}
	
	
	protected void onCreate(Bundle savedInstanceState) {
		
		System.out.println("Sayroom SDK Initiated");
		
		String LOG_TAG = "SDK Init";
		
		Log.d(LOG_TAG, "Initiated");
		
	}
	*/
	
	
}



