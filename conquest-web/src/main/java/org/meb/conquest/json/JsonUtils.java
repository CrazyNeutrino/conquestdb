package org.meb.conquest.json;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.Writer;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.ResourceBundle;
import java.util.Set;

import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.Version;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig;
import org.codehaus.jackson.map.SerializerProvider;
import org.codehaus.jackson.map.annotate.JsonSerialize.Inclusion;
import org.codehaus.jackson.map.module.SimpleModule;
import org.meb.conquest.json.mixin.JsonMixIn_JsonDeck;
import org.meb.conquest.json.model.JsonDeck;

public class JsonUtils {

	private JsonUtils() {

	}

	public static JsonGenerator createJsonGenerator(Writer writer) throws IOException {
		return new JsonFactory(createJsonObjectMapper(new ObjectMapper())).createJsonGenerator(writer);
		// .useDefaultPrettyPrinter();
	}

	public static JsonGenerator createJsonGenerator(OutputStream stream) throws IOException {
		return createJsonGenerator(new OutputStreamWriter(stream));
	}

	public static JsonParser createJsonParser(Reader reader) throws IOException {
		return new JsonFactory(createJsonObjectMapper(new ObjectMapper())).createJsonParser(reader);
	}

	public static JsonParser createJsonParser(InputStream stream) throws IOException {
		return createJsonParser(new InputStreamReader(stream));
	}

	public static ObjectMapper createJsonObjectMapper(ObjectMapper mapper) {
		mapper.setSerializationInclusion(Inclusion.NON_EMPTY);
		mapper.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		mapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ"));
		SerializationConfig config = mapper.getSerializationConfig();
		config.addMixInAnnotations(JsonDeck.class, JsonMixIn_JsonDeck.class);
		SimpleModule module = new SimpleModule("ConquestModule", Version.unknownVersion());
		// module.addDeserializer(CardSetType.class, new
		// CardSetTypeDeserializer());
		// module.addSerializer(CardSetType.class, new CardSetTypeSerializer());
		// module.addDeserializer(CardType.class, new CardTypeDeserializer());
		// module.addSerializer(CardType.class, new CardTypeSerializer());
		// module.addDeserializer(Faction.class, new FactionDeserializer());
		// module.addSerializer(Faction.class, new FactionSerializer());
		// mapper.registerModule(module);
		module.addSerializer(ResourceBundle.class, new JsonSerializer<ResourceBundle>() {

			@Override
			public void serialize(ResourceBundle value, JsonGenerator jgen, SerializerProvider provider)
					throws IOException, JsonProcessingException {
				jgen.writeStartObject();
				Set<String> keys = value.keySet();
				for (String key : keys) {
					jgen.writeFieldName(key);
					jgen.writeString(value.getString(key));
				}
				jgen.writeEndObject();
			}
		});

		mapper.registerModule(module);

		return mapper;
	}

	public static String write(Object data) throws JsonProcessingException, IOException {
		Writer writer = new StringWriter();
		createJsonGenerator(writer).writeObject(data);
		writer.flush();
		return writer.toString();
	}

	public static void write(List<?> data, OutputStream stream) throws JsonProcessingException, IOException {
		Writer writer = new OutputStreamWriter(stream);
		createJsonGenerator(writer).writeObject(data);
		writer.flush();
	}

	public static void write(List<?> data, Writer writer) throws JsonProcessingException, IOException {
		createJsonGenerator(writer).writeObject(data);
		writer.flush();
	}

	public static void write(List<?> data, String fileName) throws JsonProcessingException, IOException {
		FileOutputStream stream = new FileOutputStream(fileName);
		write(data, stream);
		stream.close();
	}

	public static <T> T[] readArray(InputStream stream, Class<T[]> clazz) throws IOException {
		return createJsonParser(stream).readValueAs(clazz);
	}

	public static <T> T[] readArray(String fileName, Class<T[]> clazz) throws IOException {
		FileInputStream stream = new FileInputStream(fileName);
		T[] result = createJsonParser(stream).readValueAs(clazz);
		stream.close();
		return result;
	}

	public static <T> T readObject(InputStream stream, Class<T> clazz) throws IOException {
		return createJsonParser(stream).readValueAs(clazz);
	}

	public static <T> T readObject(String value, Class<T> clazz) throws IOException {
		return createJsonParser(new StringReader(value)).readValueAs(clazz);
	}
}
