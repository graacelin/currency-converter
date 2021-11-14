import org.json.JSONObject;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

// API Calls
public class Main {

    private static JSONObject getCurrencyJSON() throws IOException {
        String GET_URL = "http://api.exchangeratesapi.io/v1/latest?access_key=3ebad325d5d517fefa6dbab75e0ae27b&format=1";
        System.out.println(GET_URL);
        URL url = new URL(GET_URL);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.connect();
        int responseCode = conn.getResponseCode();
        String inline = "";
        if (responseCode == conn.HTTP_OK) {

            Scanner scanner = new Scanner(url.openStream());

            //Write all the JSON data into a string using a scanner
            while (scanner.hasNext()) {
                inline += scanner.nextLine();
            }
            System.out.println(inline);
//            System.out.println(obj.getJSONObject("rates"));
//            obj.getJSONObject("rates");
        } else {
            System.out.println("Request Failed");
        }
        return new JSONObject(inline);
    }


}
