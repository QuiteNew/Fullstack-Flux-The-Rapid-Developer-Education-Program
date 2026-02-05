import java.io.Serializable;

public class SerializationDef implements Serializable {


    private String product;
    private String feature;
    transient private int featureCount;

    @Override
    public String toString(){
        return product + " " + feature + " " + featureCount;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public String getFeature() {
        return feature;
    }

    public void setFeature(String feature) {
        this.feature = feature;
    }

    public int getFeatureCount() {
        return featureCount;
    }

    public void setFeatureCount(int featureCount) {
        this.featureCount = featureCount;
    }

}