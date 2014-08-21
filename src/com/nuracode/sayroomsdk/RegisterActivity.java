package com.nuracode.sayroomsdk;

import java.util.ArrayList;
import java.util.List;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONObject;

import com.nuracode.sayroom.R;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class RegisterActivity extends Activity implements OnClickListener{

	EditText username, name, pass, cpass, email;
	Button submit;
	
	String location = "temp location";
	String url_to_reg = "http://api.sayroom.com/v1/sayroomModel/userRegister";
	//String api_key = "bi4WZa1TXqRv75sJXKMjLY6JarnFDwZpQ1WqodwLkSG2rdKmG8";
	String api_key = "3r9gyBK3hurUQx82OwMSsjm4";
	
	JSONParser jParser;
	SharedPreferences prefs = null;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_register);
		username = (EditText)findViewById(R.id.username);
		name = (EditText)findViewById(R.id.name);
		pass = (EditText)findViewById(R.id.password);
		cpass = (EditText)findViewById(R.id.cpassword);
		email = (EditText)findViewById(R.id.email);
		submit = (Button)findViewById(R.id.submit);
		submit.setOnClickListener(this);
		jParser = new JSONParser(this);
		prefs = PreferenceManager.getDefaultSharedPreferences(this);
		
		
		///check if user preferneces empty
		
		//if not empty, go to home page, if empty
		
		
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.register, menu);
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
	}

	@Override
	public void onClick(View v) {
		if(v.getId() == R.id.submit){
			if(isValidFields()){
				new DoRegister().execute();
			}
		}
		
	}
	
	private boolean isValidFields(){
		if(name.getText().toString().trim().isEmpty()){
			makeToast("Name can not be empty");
			return false;
		}else if(username.getText().toString().trim().isEmpty()){
			makeToast("Username can not be empty");
			return false;
		}else if(pass.getText().toString().trim().isEmpty()){
			makeToast("Username can not be empty");
			return false;
		}else if(cpass.getText().toString().trim().isEmpty()){
			makeToast("Username can not be empty");
			return false;
		}else if(email.getText().toString().trim().isEmpty()){
			makeToast("Username can not be empty");
			return false;
		}else if(!pass.getText().toString().trim().equals(cpass.getText().toString().trim())){
			makeToast("Password amd confirm password must be same.");
			return false;
		}
		return true;
	}
	
	class DoRegister extends AsyncTask<String, String, String>{
		ProgressDialog pDialog;
		JSONObject json;
		int success;
		
		@Override
		protected void onPreExecute() {
			pDialog = ProgressDialog.show(RegisterActivity.this, "Reistering", "Please wait..");
			super.onPreExecute();
		}

		@Override
		protected String doInBackground(String... args) {
			List<NameValuePair> params = new ArrayList<NameValuePair>();
			String url = url_to_reg+"/"+name.getText().toString().trim()+"/"+username.getText().toString().trim()
					+"/"+email.getText().toString().trim()+"/"+pass.getText().toString().trim()+"/1/"+location+"?api_key="+api_key;
			url = url.replace("@", "%40");
			url = url.replace(" ", "%20");
			json = jParser.makeHttpRequest(url, "GET", params);
			
			Log.d("Register:", json+"");
			
			if(json == null)
				return null;
			
			try{
				success = json.getInt("response");
				prefs.edit().putString("userId", json.getInt("member_id")+"").commit();				
			}catch (Exception e){
				e.printStackTrace();
			}
			
			return null;
		}
		
		@Override
		protected void onPostExecute(String result) {
			
			if(pDialog != null && pDialog.isShowing()){
				pDialog.dismiss();
			}
			if(success == 1){
				makeToast("Registered successfully.");
				startActivity(new Intent(RegisterActivity.this,MainActivity.class)
				.putExtra("isNewUser", true));
			}else{
				makeToast("Unable to register, please try again."+result);
			}
			super.onPostExecute(result);
		}
		
	}
	
	private void makeToast(String message){
		Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
	}
}
