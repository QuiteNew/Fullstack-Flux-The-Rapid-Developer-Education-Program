import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {

        Map<Integer, String> hmap = new HashMap<Integer,String>();
        hmap.put(1, "ABC");
        hmap.put(2, "XCB");

        Map<Integer,String> result = hmap.entrySet().stream().filter(p -> p.getKey() <=2).filter(map -> map.getValue().startsWith("A")).collect(Collectors.toMap(map -> map.getKey(), map -> map.getValue()));

        System.out.println(result);
    }
}
