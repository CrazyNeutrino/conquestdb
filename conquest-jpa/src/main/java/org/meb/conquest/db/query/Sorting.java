package org.meb.conquest.db.query;

import java.util.Collection;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class Sorting {

	public enum Direction {
		ASC, DESC
	}

	@Getter
	@Setter(AccessLevel.PROTECTED)
	@RequiredArgsConstructor
	public static class Item {

		@NonNull
		private String property;

		@NonNull
		private Direction direction;
	}

	private Map<String, Item> itemsMap = new LinkedHashMap<String, Item>();

	public Collection<Item> items() {
		return Collections.unmodifiableCollection(itemsMap.values());
	}
	
	public int itemsCount() {
		return itemsMap.size();
	}

	public void toggleSorting(String property) {
		Item item = itemsMap.get(property);
		if (item.getDirection() == null) {
			setSortingAsc(property);
		} else if (item.getDirection() == Direction.ASC) {
			setSortingDesc(property);
		} else {
			removeSorting(property);
		}
	}
	
	public void setSorting(String property, Direction direction) {
		if (direction == Direction.ASC) {
			setSortingAsc(property);
		} else if (direction == Direction.DESC) {
			setSortingDesc(property);
		}
	}

	public void setSortingAsc(String property) {
		itemsMap.put(property, new Item(property, Direction.ASC));
	}

	public void setSortingDesc(String property) {
		itemsMap.put(property, new Item(property, Direction.DESC));
	}

	public void removeSorting(String property) {
		itemsMap.remove(property);
	}
}
