package com.nuracode.sayroomsdk;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.NameValuePair;
import org.json.JSONObject;

import android.app.ProgressDialog;
import android.os.AsyncTask;
import android.util.Log;

class SRImageAudioUpload extends AsyncTask<String, String, String>{

	String userID,brandImageID,userCurrentLocation,fileName;
	ProgressDialog pDialog;
	JSONObject json;
	String api_key = SayroomSDK.retreiveApiKey();
	
	private String url_upload_audio_images = "http://api.sayroom.com/v1/sayroomModel/recordUploadImages";

	
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
	
	public SRImageAudioUpload(String userID,String brandImageID,String userCurrentLocation,String fileName) {
		SayroomRecorder.stopRecording();
		this.userID = userID;
		this.brandImageID = brandImageID;
		this.userCurrentLocation = userCurrentLocation;
		this.fileName = fileName;
	}
	
	
	@Override
	protected void onPreExecute() {
		//pDialog = ProgressDialog.show(MainActivity.this, "Uploading Audio", "Please wait..");
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
